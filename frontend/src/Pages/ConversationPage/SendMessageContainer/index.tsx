import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageInput } from "../../../styled_components/conversationContainer";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {useForm} from 'react-hook-form'
import { MessagesService } from "../../../services/MessagesService";
import './sendMessageContainer.css'
import { MessageIndividual } from "../../../interfaces/conversation";

type Props = {
  senderId: string
  receiverId: string
  setMessages: React.Dispatch<React.SetStateAction<MessageIndividual[]>>
}

export const SendMessageContainer = ({senderId, receiverId, setMessages}: Props) => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      const newMessage = await MessagesService.sendMessage(senderId, receiverId, data.message)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      reset()
    }})

  return (
      <form className="send-message-form" onSubmit={onSubmit}>
        <MessageInput
          placeholder="Write your message here"
          {...register('message', {
            required: 'El mensaje es obligatorio',
            // validate: validateMessage
          })}
        />
        <button type="submit">
          <FontAwesomeIcon className='send-chatButton' icon={faPaperPlane} />
        </button>
      </form>
  );
};