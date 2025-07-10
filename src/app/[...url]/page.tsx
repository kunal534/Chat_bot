import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

interface PageProps {
  params: Promise<{ url: string[] }>;
}

function reconstructUrl({ url }: { url: string[] }) {
  const decoded = decodeURIComponent(url.join("/"));

  // Ensure only one https:// is present
  if (!/^https?:\/\//i.test(decoded)) {
    return "https://" + decoded;
  }

  return decoded;
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
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    await redis.sadd("indexed-urls", reconstructedUrl);
  }

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default Page;