import { useEffect, useState } from 'react';
import './conversationPage.css'
import { useLocation } from 'react-router-dom'
import { ConversationService } from '../../services/ConversationService';
import { MessagesService } from '../../services/MessagesService';

export const ConversationPage = () => {
  const [conversation, setconversation] = useState()
  const location = useLocation();
  const {loggedUserId, user} = location.state;
  console.log(user)
  console.log(loggedUserId)

  const getConver = async () => {
    const response = await MessagesService.getMessages(loggedUserId, user.id)
    setconversation(response)
  }
  useEffect(() => {
    getConver()
  }, [])

  useEffect(() => {
    console.log(conversation)
  }, [conversation])
  return (
    <div>fe</div>
     
  )
}