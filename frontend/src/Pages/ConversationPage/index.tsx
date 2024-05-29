import { useEffect, useState } from 'react';
import './conversationPage.css'
import { useLocation } from 'react-router-dom'
import { MessageIndividual } from '../../interfaces/conversation';
import { getMessages } from '../../utils/petitionsToBackend';
import { ConversationContainer, ConversationHeader, ConversationUserDetails, ConversationUserName, ConversationUserPhoto, Message, MessageInput, MessageInputContainer, Messages } from '../../styled_components/conversationContainer';
import { Layout } from '../../components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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

  // isSender={msg.sender === 'self'}
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
              <Message key={msg.id}>
                {msg.message}
              </Message>
            ))}
          </Messages>
        <MessageInputContainer>
          <MessageInput
            // type="text"
            // value={newMessage}
            // onChange={(e) => setNewMessage(e.target.value)}
            // placeholder="Type your message..."
          />
          <FontAwesomeIcon className='send-chatButton' icon={faPaperPlane} />
        </MessageInputContainer>
      </ConversationContainer>
    </Layout>
  );
}