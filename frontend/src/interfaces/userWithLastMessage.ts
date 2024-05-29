import { ShortedUser } from "./userInterface";
import { MessageIndividual } from "./conversation";

export interface UserWithLastMessage {
    conversationId: string,
    lastMessage: MessageIndividual,
    user: ShortedUser
}