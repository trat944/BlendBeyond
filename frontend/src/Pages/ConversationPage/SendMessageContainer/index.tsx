import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageInput } from "../../../styled_components/conversationContainer";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {useForm} from 'react-hook-form'
import { MessagesService } from "../../../services/MessagesService";
import './sendMessageContainer.css'
import { MessageIndividual } from "../../../interfaces/conversation";
import { validateMessage } from "../../../utils/validateMessage";
import { useState } from "react";

type Props = {
  senderId: string
  receiverId: string
  setMessages: React.Dispatch<React.SetStateAction<MessageIndividual[]>>
}

export const SendMessageContainer = ({senderId, receiverId, setMessages}: Props) => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm();
  const [messageError, setMessageError] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      const isMessageValid = validateMessage(data.message);
      if (isMessageValid) {
        setMessageError(false)
        const newMessage: MessageIndividual = await MessagesService.sendMessage(senderId, receiverId, data.message);
        reset();
        setMessages((prevMessages) => {
          if (prevMessages) {
            return [...prevMessages, newMessage]; 
          } else {
            return [newMessage];
          }
        });
      } else setMessageError(true)
    }
  });

  return (
      <form className="send-message-form" onSubmit={onSubmit}>
        <div className="send-message-container">
          <MessageInput
            placeholder="Write your message here"
            {...register('message', {
              required: true
            })}
          />
          <button type="submit">
            <FontAwesomeIcon className="send-message-icon" icon={faPaperPlane} />
          </button>
        </div>
        {messageError && <span className="message-violation-error">Your message contains inappropriate content</span>}
      </form>
  );
};