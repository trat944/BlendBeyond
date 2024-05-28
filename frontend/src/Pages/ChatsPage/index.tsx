import { useContext, useEffect, useState } from "react";
import { User } from "../../interfaces/userInterface";
import { UserContext } from "../../hooks/userContext";
import { Menu } from "../../components/Menu";
import './chatsPage.css'
import { getUsersWithChat } from "../../utils/petitionsToBackend";
import { ChatCard } from "./ChatCard";
import { UserWithLastMessage } from "../../interfaces/userWithLastMessage";


export const ChatsPage = () => {
  const user: User | null = useContext(UserContext).state.user;
  const [usersWithChatAndLastMessage, setUsersWithChatAndLastMessage] = useState<UserWithLastMessage[]>([]);

  useEffect(() => {
   getUsersWithChat(user, setUsersWithChatAndLastMessage)
  }, []);

  return (
    <>
      <div className="chat-container">
        {usersWithChatAndLastMessage && usersWithChatAndLastMessage.length > 0 && user ? (
          <div>
            <h1 className="chat-title">Conversations</h1>
            {usersWithChatAndLastMessage.map(userWithConversationAndLastMessage => (
              <div key={userWithConversationAndLastMessage.user.id}>
                <ChatCard
                  loggedUserId={user.id}
                  userWithConversationAndLastMessage={userWithConversationAndLastMessage}
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