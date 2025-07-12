import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

interface PageProps {
  params: Promise<{ url: string[] }>;
}

function reconstructUrl({ url }: { url: string[] }) {
  const raw = decodeURIComponent(url.join("/"));

  // Normalize it: remove trailing slashes and multiple protocols
  const cleaned = raw.replace(/^https?:\/+/, ""); // remove leading protocol
  return `https://${cleaned}`;
}

const Page = async ({ params }: PageProps) => {
  const sessionCookie = (await cookies()).get("sessionId")?.value;
  const resolvedParams = await params;
  const reconstructedUrl = reconstructUrl({ url: resolvedParams.url as string[] });

  const sessionId = (reconstructedUrl + "--" + sessionCookie)
    .replace(/[/:.]/g, "_");

  const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);
  const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId });

  if (!isAlreadyIndexed) {
    try {
      // Attempt to index the content
      await ragChat.context.add({
        type: "html",
        source: reconstructedUrl,
        config: { chunkSize: 500, chunkOverlap: 50 },
      });

      await redis.sadd("indexed-urls", reconstructedUrl);
    } catch (err) {
      const error = err as Error;

      let fallbackContent = "⚠️ This page could not be indexed. Try a simpler or public link.";
      if (error.message.includes("Exceeded max batch write limit")) {
        console.warn("Too many chunks, skipping indexing.");
        fallbackContent = "⚠️ This page is too large to index. Try a simpler link.";
        await redis.sadd("skipped-urls", reconstructedUrl);
      } else if (error.message.includes("Missing vector data")) {
        console.warn("No vectorizable content on the page.");
        await redis.sadd("skipped-urls", reconstructedUrl);
      } else {
        console.error("Failed to index:", error);
      }

      return (
        <ChatWrapper
          sessionId={sessionId}
          initialMessages={[
            {
              id: uuidv4(),
              role: "system",
              content: fallbackContent,
            },
          ]}
        />
      );
    }
  }

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default Page;
