import { useEffect, useState } from "react";
import { UserWithLastMessage } from "../../../interfaces/userWithLastMessage";
import { ChatCardContainer, ChatLastMessage, ChatProfilePic, ChatUserName, StyledLink } from "../../../styled_components/chatCard";
import { DeleteButton } from "./deleteButton";
import { useSocketContext } from "../../../hooks/socketContext";

type Props ={
  loggedUserId: number;
  userWithConversationAndLastMessage: UserWithLastMessage
  setUsersWithChatAndLastMessage: React.Dispatch<React.SetStateAction<UserWithLastMessage[]>>
}

export const ChatCard = ({ loggedUserId, userWithConversationAndLastMessage, setUsersWithChatAndLastMessage }: Props) => {
  const { user, lastMessage, conversationId } = userWithConversationAndLastMessage;
  const [lastMessageText, setLastMessageText] = useState(lastMessage?.message || '');

  const {onlineUsers, isFetchingUsers} = useSocketContext();
  console.log(onlineUsers)
  const isOnline = onlineUsers.includes(user.id)

  useEffect(() => {
    if (lastMessage) {
      const limitLastMessage = () => {
        const maxNumberOfLetters = 15;
        if (lastMessage.message.length > maxNumberOfLetters) {
          const limitedText = lastMessage.message.slice(0, maxNumberOfLetters) + '...';
          setLastMessageText(limitedText);
        } else {
          setLastMessageText(lastMessage.message);
        }
      };
      limitLastMessage();
    }
  }, [lastMessage]);

  return (
    <>
      <StyledLink to={`/conversation/${user.id}`} state={{ user, loggedUserId }}>
        <ChatCardContainer>
          <DeleteButton 
            conversationId={conversationId}
            setUsersWithChatAndLastMessage={setUsersWithChatAndLastMessage}
            userName={user.name}
          />
          <ChatProfilePic src={user.pictureUrl || './src/assets/th.jpg'} alt={user.name} />
          <ChatUserName>{user.name}</ChatUserName>
          {isFetchingUsers ? (
            <span>Fetching...</span>
          ) : isOnline ? (
            <span>Online</span>
          ) : (
            <span>Not Online</span>
          )}
          {lastMessageText ? <ChatLastMessage>{lastMessageText}</ChatLastMessage> : <ChatLastMessage>No messages</ChatLastMessage>}
        </ChatCardContainer>
      </StyledLink>

    </>
  );
};
