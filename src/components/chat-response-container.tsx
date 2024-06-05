import { IChat } from "@/types/chats"

export function ChatResponseContainer(chat: IChat) {
  return (
    <div className="border border-lime-400 rounded-md">
      <p className="p-2 text-justify">{chat.history[0].parts[0].text}</p>
    </div>
  )
}