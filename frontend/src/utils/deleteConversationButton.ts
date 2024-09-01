import { ConversationService } from "../services/ConversationService"

export const deleteConversationWithButton = async (conversationId: string) => {
  await ConversationService.deleteConversation(conversationId)
}