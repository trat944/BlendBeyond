import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageInput, MessageInputContainer } from "../../../styled_components/conversationContainer";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";



export const SendMessageContainer = () => {
  return (
    <MessageInputContainer>
    <MessageInput
      // type="text"
      // value={newMessage}
      // onChange={(e) => setNewMessage(e.target.value)}
      // placeholder="Type your message..."
    />
    <FontAwesomeIcon className='send-chatButton' icon={faPaperPlane} />
  </MessageInputContainer>
  );
};