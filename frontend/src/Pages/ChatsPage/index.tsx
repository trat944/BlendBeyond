import { useContext, useEffect, useState } from "react";
import { ShortedUser, User } from "../../interfaces/userInterface";
import { UserContext } from "../../hooks/userContext";
import { Menu } from "../../components/Menu";
import './chatsPage.css'
import { getUsersWithChat } from "../../utils/petitionsToBackend";
import { ChatCard } from "./ChatCard";


export const ChatsPage = () => {
  const user: User | null = useContext(UserContext).state.user;
  const [usersWithChat, setUsersWithChat] = useState<ShortedUser[]>([]);

  useEffect(() => {
   getUsersWithChat(user, setUsersWithChat)
  }, []);

  useEffect(() => {
    console.log(usersWithChat)
  }, [usersWithChat])

  return (
    <>
      <div className="chat-container">
        {usersWithChat && usersWithChat.length > 0 && user ? (
          <div>
            <h1 className="chat-title">Your conversations:</h1>
            {usersWithChat.map(userWithConversation => (
              <div key={userWithConversation.id}>
                <ChatCard
                  key={userWithConversation.id}
                  loggedUserId={user.id}
                  userWithConversation={userWithConversation}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>feef</div>
        )}
      </div>
      <Menu />
    </>
  )
}