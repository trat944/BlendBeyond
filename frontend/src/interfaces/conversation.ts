export interface Conversation {
  id: string,
  participant1Id: string,
  participant2Id: string,
  createdAt: Date,
  updateAt: Date,
  messages: Message[]
}

export interface Message {
  id: string,
  senderId: string,
  receiverId: string,
  createdAt: Date,
  updateAt: Date,
  conversationId: string
}