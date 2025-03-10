import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { ChatWrapper } from "../../components/ChatWrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function reconstructUrl({ url }: { url: string[] }) {
    const decoded_components = url.map((component) => decodeURIComponent(component));
    return decoded_components.join("/");
}

const Page = async ({ params }: { params: Promise<{ url: string[] }> }) => {
    const resolvedParams = await params;
    const urlArray = resolvedParams.url;

    // Redirect to welcome page if no URL is provided
    if (urlArray.length === 0) {
        redirect("/");
    }

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("sessionId")?.value ?? "anonymous";
    const reconstructed_url = reconstructUrl({ url: urlArray });
    const sessionId = (reconstructed_url + "--" + sessionCookie).replace(/\//g, "");

    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructed_url);
    const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId });

    if (!isAlreadyIndexed) {
        try {
            await ragChat.context.add({
                type: "html",
                source: reconstructed_url,
                config: { chunkOverlap: 200, chunkSize: 1000 },
            });
            await redis.sadd("indexed-urls", reconstructed_url);
        } catch (error) {
            console.error("Failed to index URL:", error);
            return (
                <ChatWrapper
                    sessionId={sessionId}
                    initialMessages={initialMessages}
                    errorMessage="Sorry, this page is too large or couldn’t be indexed. Try a smaller page!"
                />
            );
        }
    }

    return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default Page;
