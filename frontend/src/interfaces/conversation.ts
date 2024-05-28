export interface Conversation {
  id: string,
  participant1Id: string,
  participant2Id: string,
  createdAt: Date,
  updateAt: Date,
  messages: MessageIndividual[]
}

export interface MessageIndividual {
  id: string,
  senderId: string,
  message: string,
  receiverId: string,
  createdAt: Date,
  updateAt: Date,
  conversationId: string
}