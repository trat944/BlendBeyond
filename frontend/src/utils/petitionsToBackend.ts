import { ShortedUser, User } from "../interfaces/userInterface"
import { UserFilteringService } from "../services/UserFiltering"

export const getMatchedUsers = async (user: User | null, setUsers: React.Dispatch<React.SetStateAction<User[]>> ) => {
  if (user) {
    try {
      const matchedUsers: User[]  = await UserFilteringService.getMatchedUsers(user);
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

export const getUsersWithChat = async (user: User | null, setUsers: React.Dispatch<React.SetStateAction<ShortedUser[]>>) => {
  if (user) {
    try {
      const usersWithConversation: ShortedUser[] = await UserFilteringService.getUsersWithConversation(user.id)
      setUsers(usersWithConversation)
    } catch (error) {
      console.error('Error fetching desired users:', error);
    }
  }
};