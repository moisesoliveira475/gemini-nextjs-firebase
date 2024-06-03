import { IChat } from "@/types/chats"
import { ComponentProps } from "react"
import styles from '@/styles/list.module.css'

interface IChatHistoryListProps extends ComponentProps<'ul'> {
  chats: IChat[]
}

export function ChatHistoryList(props: IChatHistoryListProps) {
  return (
    <ul className={styles.list}
    >
      {
        props.chats.map((chat) => {
          return (
            <li className="text-lime-400 text-sm underline hover:border border-lime-200 rounded-lg p-1" key={chat.id}>{chat.subject}</li>
          )
        })
      }
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
      <li>assunto x</li>
    </ul>
  )
}