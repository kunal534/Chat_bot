import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

export const Message = ({ content, isUserMessage }: MessageProps) => {
  return (
    <div
      className={cn("rounded-md", {
        "bg-[#2c2c2c] text-[#E0D6C9]": isUserMessage,
        "bg-[#1a1a1a] text-[#c2bdb1]": !isUserMessage,
      })}
    >
      <div className="p-6">
        <div className="max-w-3xl mx-auto flex items-start gap-2.5">
          <div
            className={cn(
              "size-10 shrink-0 aspect-square rounded-full border flex justify-center items-center",
              {
                "border-[#5C4033] bg-[#3b3b3b] text-[#F5F5DC]": isUserMessage,
                "border-[#3c3c3c] bg-[#1f1f1f] text-[#E0D6C9]": !isUserMessage,
              }
            )}
          >
            {isUserMessage ? <User className="size-5" /> : <Bot className="size-5" />}
          </div>

          <div className="flex flex-col ml-6 w-full">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-serif tracking-wide text-[#D1BFA9]">
                {isUserMessage ? "You" : "Website"}
              </span>
            </div>

            <p className="text-sm font-mono py-2.5 text-[#D8D8D8] whitespace-pre-wrap">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
