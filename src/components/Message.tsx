import { cn } from "@/lib/utils"
import { User, Bot } from "lucide-react"

interface MessageProps {
    content: string
    isUserMessage: boolean
}

export const Message = ({ content, isUserMessage }: MessageProps) => {
    return (
        <div className={cn(
            "w-full max-w-3xl mx-auto flex flex-col gap-2 p-4 rounded-lg",
            { "bg-zinc-800": isUserMessage, "bg-zinc-900/25": !isUserMessage }
        )}>
            {/* Icon + Name */}
            <div className="flex items-center gap-2">
                <div className={cn(
                    "size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
                    { "bg-blue-950 border-blue-700 text-zinc-200": isUserMessage }
                )}>
                    {isUserMessage ? <User className="size-5" /> : <Bot className="size-5 text-white" />}
                </div>
                <span className="text-sm font-semibold text-white">
                    {isUserMessage ? "You" : "Website"}
                </span>
            </div>

            {/* Message Content */}
            <div className="text-white w-full">
                {content}
            </div>
        </div>
    )
}
