import { useEffect, useState } from "react";
import { UserWithLastMessage } from "../../../interfaces/userWithLastMessage";
import { ChatCardContainer, ChatLastMessage, ChatProfilePic, ChatUserName } from "../../../styled_components/chatCard";

type Props ={
  loggedUserId: number;
  userWithConversationAndLastMessage: UserWithLastMessage
}

export const ChatCard = ({ loggedUserId, userWithConversationAndLastMessage }: Props) => {
  const { user, lastMessage } = userWithConversationAndLastMessage;
  const [lastMessageText, setLastMessageText] = useState(lastMessage.message)

  useEffect(() => {
    const limitLastMessage = () => {
      const maxNumberOfLetters= 15;
      if (lastMessage.message.length > 15) {
        const limitedText = lastMessage.message.slice(0, maxNumberOfLetters) + '...';
        setLastMessageText(limitedText)
      }
    }
    limitLastMessage()
  }, [lastMessage])

  return (
    <ChatCardContainer>
      <ChatProfilePic src={user.pictureUrl} alt={user.name} />
      <ChatUserName>{user.name}</ChatUserName>
      <ChatLastMessage>{lastMessageText}</ChatLastMessage>
    </ChatCardContainer>
  );
};
