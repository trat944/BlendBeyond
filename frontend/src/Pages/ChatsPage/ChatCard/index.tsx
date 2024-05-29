import { useEffect, useState } from "react";
import { UserWithLastMessage } from "../../../interfaces/userWithLastMessage";
import { ChatCardContainer, ChatLastMessage, ChatProfilePic, ChatUserName, StyledLink } from "../../../styled_components/chatCard";
import { DeleteButton } from "./deleteButton";

type Props ={
  loggedUserId: number;
  userWithConversationAndLastMessage: UserWithLastMessage
  setUsersWithChatAndLastMessage: React.Dispatch<React.SetStateAction<UserWithLastMessage[]>>
}

export const ChatCard = ({ loggedUserId, userWithConversationAndLastMessage, setUsersWithChatAndLastMessage }: Props) => {
  const { user, lastMessage, conversationId } = userWithConversationAndLastMessage;
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
    <>
      <StyledLink to={`/conversation/${user.id}`} state={{ user, loggedUserId }}>
        <ChatCardContainer>
          <DeleteButton 
            conversationId={conversationId}
            setUsersWithChatAndLastMessage={setUsersWithChatAndLastMessage}
          />
          <ChatProfilePic src={user.pictureUrl} alt={user.name} />
          <ChatUserName>{user.name}</ChatUserName>
          <ChatLastMessage>{lastMessageText}</ChatLastMessage>
        </ChatCardContainer>
      </StyledLink>

    </>
  );
};
