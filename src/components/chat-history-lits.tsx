import { IChat } from "@/lib/firebase/firestore"
import { ComponentProps } from "react"

interface IChatHistoryListProps extends ComponentProps<'ul'> {
  chats: IChat[]
}

export function ChatHistoryList(props: IChatHistoryListProps) {
  return (
    <ul>
      {
        props.chats.map((chat) => {
          return (
            <li key={chat.id}>{chat.response}</li>
          )
        })
      }
    </ul>
  )
}