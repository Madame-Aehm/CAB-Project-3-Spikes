export interface ChatMsg {
  author: string,
  text: string,
  date: number | Date
}

export interface ChatMsgWithID extends ChatMsg {
  id: string
}