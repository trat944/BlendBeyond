import { useContext, useEffect, useState } from "react";
import { User } from "../../interfaces/userInterface";
import { UserContext } from "../../hooks/userContext";
import './chatsPage.css'
import { getUsersWithChat } from "../../utils/petitionsToBackend";
import { ChatCard } from "./ChatCard";
import { UserWithLastMessage } from "../../interfaces/userWithLastMessage";
import { NoChats } from "./no-chats";
import { SearcherBarForUsers } from "../../components/SearcherBarForUsers";
import { goBackToConversations } from "../../utils/goBackToConversations";
import { BackAllUsersButton } from "../../styled_components/backAllUsersButton";
import { Layout } from "../../components/layout";

export const ChatsPage = () => {
  const user: User | null = useContext(UserContext).state.user;
  const [usersWithChatAndLastMessage, setUsersWithChatAndLastMessage] = useState<UserWithLastMessage[]>([]);
  const [searcherTrigger, setSearcherTrigger] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchChats = async () => {
      setIsLoading(true);
      await getUsersWithChat(user, setUsersWithChatAndLastMessage);
      setIsLoading(false);
    };
    fetchChats();
  }, []);

  return (
    <Layout>
      <div className="chat-container">
        {!isLoading && usersWithChatAndLastMessage && usersWithChatAndLastMessage.length > 0 && user ? (
          <>
            <div className="chat-header">
              <h1 className="chat-title">Conversations 💬</h1>

              {searcherTrigger ? (
                <SearcherBarForUsers 
                  setSearcherTrigger={setSearcherTrigger} 
                  usersWithLastMessage={usersWithChatAndLastMessage} 
                  setUsersWithConversation={setUsersWithChatAndLastMessage} 
                />
              ) : (
                <BackAllUsersButton onClick={() => goBackToConversations(setSearcherTrigger, user, setUsersWithChatAndLastMessage)}>
                  ← Go back
                </BackAllUsersButton>
              )}
            </div>

            <div className="chats-list">
              {usersWithChatAndLastMessage.map(userWithConversationAndLastMessage => (
                <ChatCard
                  key={userWithConversationAndLastMessage.user.id}
                  loggedUserId={user.id}
                  userWithConversationAndLastMessage={userWithConversationAndLastMessage}
                  setUsersWithChatAndLastMessage={setUsersWithChatAndLastMessage}
                />
              ))}
            </div>
          </>
        ) : !isLoading ? (
          <NoChats user={user} />
        ) : null}
      </div>
    </Layout>
  )
}