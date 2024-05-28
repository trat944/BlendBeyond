// import { Conversation } from "../interfaces/conversation";
import { User } from "../interfaces/userInterface"
// import { ConversationService } from "../services/ConversationService";
import { UserFilteringService } from "../services/UserFiltering"

export const getMatchedUsers = async (user: User | null, setUsers: React.Dispatch<React.SetStateAction<User[]>> ) => {
  if (user) {
    try {
      const matchedUsers: User[]  = await UserFilteringService.getMatchedUsers(user);
      // const conversationsStarted: Conversation[] = await ConversationService.getConversations(user.id)
      // console.log(conversationsStarted)
      setUsers(matchedUsers);
    } catch (error) {
      console.error('Error fetching desired users:', error);
    }
  }
};

export const getDesiredUsers = async (user: User | null, setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {
  if (user) {
    try {
      const response: User[] = await UserFilteringService.getDesiredUsers(user);
      setUsers(response);
    } catch (error) {
      console.error('Error fetching desired users:', error);
    }
  }
};