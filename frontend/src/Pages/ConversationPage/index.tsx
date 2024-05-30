import { useEffect, useRef, useState } from 'react';
import './conversationPage.css'
import { useLocation } from 'react-router-dom'
import { MessageIndividual } from '../../interfaces/conversation';
import { getMessages } from '../../utils/petitionsToBackend';
import { ConversationContainer, ConversationHeader, ConversationUserDetails, ConversationUserName, ConversationUserPhoto, Messages } from '../../styled_components/conversationContainer';
import { Layout } from '../../components/layout';
import { MessageContainer } from './MessageContainer';
import { SendMessageContainer } from './SendMessageContainer';

export const ConversationPage = () => {
  const location = useLocation();
  const [messages, setMessages] = useState<MessageIndividual[]>([]);
  const { loggedUserId, user } = location.state;
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessages(loggedUserId, user.id, setMessages);
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [loggedUserId, user.id]);

  return (
    <Layout>
      <ConversationContainer>
        <ConversationHeader>
          <ConversationUserDetails>
            <ConversationUserPhoto src={user.pictureUrl} alt="User" />
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
                  key={msg.id}
                  isSender={msg.senderId === loggedUserId}
                  msg={msg}
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