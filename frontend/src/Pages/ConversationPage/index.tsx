import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageContainer } from './MessageContainer';
import { Layout } from '../../components/layout';
import { SendMessageContainer } from './SendMessageContainer';
import { useMessages } from '../../hooks/useMessages';
import { ConversationContainer, ConversationHeader, ConversationUserDetails, ConversationUserName, ConversationUserPhoto, Messages } from '../../styled_components/conversationContainer';


export const ConversationPage = () => {
  const location = useLocation();
  const { loggedUserId, user } = location.state;
  const { messages, setMessages, lastMessageRef, isOnline } = useMessages(loggedUserId, user.id);
  const [currentOpenMenu, setCurrentOpenMenu] = useState<string | null>(null);

  return (
    <Layout>
      <ConversationContainer>
        <ConversationHeader>
          <ConversationUserDetails>
            <div className="user-avatar">
              <ConversationUserPhoto src={user.pictureUrl} alt="User" />
              {isOnline && <div className="online-indicator"></div>}
            </div>
            <ConversationUserName>{user.name}</ConversationUserName>
          </ConversationUserDetails>
        </ConversationHeader>
        {messages && (
          <Messages>
            {messages.map((msg, index) => (
              <div
                className='messages-father'
                key={msg.id}
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                <MessageContainer
                  receiverId={user.id}
                  key={msg.id}
                  isSender={msg.senderId === loggedUserId}
                  msg={msg}
                  currentOpenMenu={currentOpenMenu}
                  setCurrentOpenMenu={setCurrentOpenMenu}
                />
              </div>
            ))}
          </Messages>
        )}
        <SendMessageContainer
          senderId={loggedUserId}
          receiverId={user.id}
          setMessages={setMessages}
        />
      </ConversationContainer>
    </Layout>
  );
};