import { type Message as TMessage } from "ai/react"
import { Message } from "./Message"
import { MessageSquare } from "lucide-react"


interface MessagesProps {
    messages: TMessage[]
}

export const Messages = ({ messages }: MessagesProps) => {
    return (
        <div className="flex flex-col space-y-4 p-4 max-h-[calc(100vh-3.5rem-7rem)] overflow-y-auto">
            {messages.length ? (messages.map((message, index) =>(
                <Message key={index} content={message.content} isUserMessage={message.role === "user"} />
            ))
            ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-2">
                <MessageSquare className="size-8 text-blue-500"/>
                <h3 className="font-semibold text-xl text-white"> You're all set </h3>
                <p className="text-zinc-500 text-sm">
                    Let's start the new story 
                </p>
            </div>
            )}
        </div>
    )
}