import { User } from "../interfaces/userInterface"
import { UserWithLastMessage } from "../interfaces/userWithLastMessage"
import { getMatchedUsers, getUsersWithChat } from "./petitionsToBackend"

export const goBackToConversations = (
  setSearcherTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  user: User,
  setUsersWithConversations?: React.Dispatch<React.SetStateAction<UserWithLastMessage[]>>,
  setMatchedUsers?: React.Dispatch<React.SetStateAction<User[]>>
) => {
  if (setUsersWithConversations) {
    getUsersWithChat(user, setUsersWithConversations as React.Dispatch<React.SetStateAction<UserWithLastMessage[]>>);
    setSearcherTrigger(true);
  }
  if (setMatchedUsers) {
    getMatchedUsers(user, setMatchedUsers as React.Dispatch<React.SetStateAction<User[]>>);
    setSearcherTrigger(true);
  }
};