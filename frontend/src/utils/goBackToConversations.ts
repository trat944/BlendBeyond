import { User } from "../interfaces/userInterface"
import { UserWithLastMessage } from "../interfaces/userWithLastMessage"
import { getUsersWithChat } from "./petitionsToBackend"

export const goBackToConversations = (
  setSearcherTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  setUsers: React.Dispatch<React.SetStateAction<UserWithLastMessage[]>>,
  user: User
) => {
  getUsersWithChat(user, setUsers)
  setSearcherTrigger(true)
}