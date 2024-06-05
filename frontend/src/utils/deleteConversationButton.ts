import { ConversationService } from "../services/ConversationService"

export const deleteConversationWithButton = async (conversationId: string) => {
  const response = await ConversationService.deleteConversation(conversationId)
}