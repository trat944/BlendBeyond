import { useEffect, useState } from 'react';
import './conversationPage.css'
import { useLocation } from 'react-router-dom'
import { MessageIndividual } from '../../interfaces/conversation';
import { getMessages } from '../../utils/petitionsToBackend';
import { ConversationContainer, ConversationHeader, ConversationUserDetails, ConversationUserName, ConversationUserPhoto, Messages } from '../../styled_components/conversationContainer';
import { Layout } from '../../components/layout';
import { MessageContainer } from './Message';
import { SendMessageContainer } from './SendMessageContainer';

export const ConversationPage = () => {
  const location = useLocation();
  const [messages, setMessages] = useState<MessageIndividual[]>([])
  const {loggedUserId, user} = location.state;

  useEffect(() => {
    getMessages(loggedUserId, user.id, setMessages)
  }, [])

  useEffect(() => {
    console.log(messages)
  }, [messages])


  return (
    <Layout>
        <ConversationContainer>
          <ConversationHeader>
            <ConversationUserDetails>
              <ConversationUserPhoto src={user.pictureUrl} alt="User" />
              <ConversationUserName>{user.name}</ConversationUserName>
            </ConversationUserDetails>
          </ConversationHeader>
          <Messages>
            {messages.map((msg) => (
              <MessageContainer key={msg.id} isSender={msg.senderId === loggedUserId} msg={msg}/>
            ))}
          </Messages>
          <SendMessageContainer
            senderId={loggedUserId}
            receiverId={user.id}
            setMessages={setMessages}
          />
      </ConversationContainer>
    </Layout>
  );
}