import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MessageIndividual } from '../../../../interfaces/conversation';
import './messageOptionsMenu.css'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from '../../../../services/MessagesService';
import { useMessages } from '../../../../hooks/useMessages';
import { User } from '../../../../interfaces/userInterface';
import { useContext } from 'react';
import { UserContext } from '../../../../hooks/userContext';

type Props = {
  msg: MessageIndividual,
  receiverId: string
}

export const MessageOptionsMenu = ({msg, receiverId}: Props) => {
  const userContext = useContext(UserContext);
  const user: User | null = userContext ? userContext.state.user : null;
  
  if (!user) {
    return null; 
  }
  const loggedUserId = user.id.toString();
  const { messages, setMessages } = useMessages(loggedUserId, receiverId);


  const deleteMessage = async () => {
    try {
      const response =  await MessagesService.deleteMessage(msg.id)
      if (response) {
        const updatedMessages = messages.filter(message => message.id !== msg.id);
        setMessages(updatedMessages);
      }
    } catch (error) {
      console.log(error, "Unable to delete message")
    }
  }

  return (
    <div onClick={deleteMessage} className='message-menu-container' >
      <FontAwesomeIcon className='can-icon' icon={faTrashCan} />
      <span>Delete</span>
    </div>
  )
}
