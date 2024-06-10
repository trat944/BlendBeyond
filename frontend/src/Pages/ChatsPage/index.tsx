import { useContext, useEffect, useState } from "react";
import { User } from "../../interfaces/userInterface";
import { UserContext } from "../../hooks/userContext";
import { Menu } from "../../components/Menu";
import './chatsPage.css'
import { getUsersWithChat } from "../../utils/petitionsToBackend";
import { ChatCard } from "./ChatCard";
import { UserWithLastMessage } from "../../interfaces/userWithLastMessage";
import { NoChats } from "./no-chats";
import { SearcherBarForConversations } from "../../components/Searchers/SearcherBarForConversations";
import { goBackToConversations } from "../../utils/goBackToConversations";
import { BackAllUsersButton } from "../../styled_components/backAllUsersButton";

export const ChatsPage = () => {
  const user: User | null = useContext(UserContext).state.user;
  const [usersWithChatAndLastMessage, setUsersWithChatAndLastMessage] = useState<UserWithLastMessage[]>([]);
  const [searcherTrigger, setSearcherTrigger] = useState(true)

  useEffect(() => {
   getUsersWithChat(user, setUsersWithChatAndLastMessage)
  }, []);

  return (
    <>
      <div className="chat-container">
        {usersWithChatAndLastMessage && usersWithChatAndLastMessage.length > 0 && user ? (
          <div>
            <h1 className="chat-title">Conversations</h1>

            {searcherTrigger ? <SearcherBarForConversations 
            setSearcherTrigger={setSearcherTrigger} 
            usersWithLastMessage={usersWithChatAndLastMessage} 
            setUsersWithConversation={setUsersWithChatAndLastMessage} /> :
            (
              <BackAllUsersButton onClick={() => goBackToConversations(setSearcherTrigger, setUsersWithChatAndLastMessage, user)}>Go back</BackAllUsersButton>
            )}

            {usersWithChatAndLastMessage.map(userWithConversationAndLastMessage => (
              <div key={userWithConversationAndLastMessage.user.id}>
                <ChatCard
                  loggedUserId={user.id}
                  userWithConversationAndLastMessage={userWithConversationAndLastMessage}
                  setUsersWithChatAndLastMessage={setUsersWithChatAndLastMessage}
                />
              </div>
            ))}
          </div>
        ) : (
          <NoChats />
        )}
      </div>
      <Menu />
    </>
  )
}

// WebSockets Integration: Implemented WebSockets to enhance real-time communication. Now, the user you are chatting with appears with a green indicator when they are online, and messages are updated in real-time in the chat interface.