import { NextRequest } from "next/server"
import { ragChat } from "@/lib/rag-chat"
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs"
export const POST = async (req:Request)=>
{
    const{messages,sessionId}=await req.json()

    const lastMessage=messages[messages.length-1].content// to get the recent most message

    const response=await ragChat.chat(lastMessage,{ streaming:true,sessionId })
    return aiUseChatAdapter(response)
}
