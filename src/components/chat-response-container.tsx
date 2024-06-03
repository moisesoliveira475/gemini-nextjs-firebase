interface IChatResponseContainer{
  message: string
}

export function ChatResponseContainer(props: IChatResponseContainer) {
  return (
    <div className="border border-lime-400 rounded-md">
      <p className="p-2 text-justify">{props.message}</p>
    </div>
  )
}