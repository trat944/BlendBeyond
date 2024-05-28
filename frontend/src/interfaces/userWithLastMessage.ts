import { ShortedUser } from "./userInterface";
import { MessageIndividual } from "./conversation";

export interface UserWithLastMessage {
    lastMessage: MessageIndividual
    user: ShortedUser;
}