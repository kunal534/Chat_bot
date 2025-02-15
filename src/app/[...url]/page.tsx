import { ragChat } from "@/lib/rag-chat"
import { redis } from "@/lib/redis"
import { ChatWrapper } from "../../components/ChatWrapper"
import { cookies } from "next/headers"

interface PageProps{
    params:{
        url: string | string[] | undefined
    }
}
function reconstructUrl({url}:{url:string[]})
{
    const decoded_components= url.map((Component)=>decodeURIComponent(Component))
    return decoded_components.join("/")
}

const Page = async ({params}: PageProps) =>{
    const sessionCookie=cookies().get("sessionId")?.value
    const recontructed_url=reconstructUrl({url: params.url as string[]})

    const sessionId=(recontructed_url+"--"+sessionCookie).replace(/\//g,"")

    const isAlreadyIndexed= await redis.sismember("indexed-urls",recontructed_url)
    
    const initialMessages= await ragChat.history.getMessages({amount:10,sessionId})

    if(!isAlreadyIndexed)
    {
        await ragChat.context.add({
            type:"html",
            source :recontructed_url,
            config: {chunkOverlap: 50, chunkSize: 200 },
        })
         
        await redis.sadd("indexed-urls",recontructed_url)
    }
    
    return<ChatWrapper sessionId={sessionId} initialMessages={initialMessages}/>
}
export default Page
