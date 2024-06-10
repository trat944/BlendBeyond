import { User } from "../interfaces/userInterface"
import { getMatchedUsers } from "./petitionsToBackend"

export const goBackToMatches = (
  setSearcherTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  user: User
) => {
  getMatchedUsers(user, setUsers)
  setSearcherTrigger(true)
}