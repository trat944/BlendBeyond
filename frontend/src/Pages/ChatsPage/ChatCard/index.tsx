import React from "react";
import { ShortedUser } from "../../../interfaces/userInterface";
import { ChatCardContainer, ChatProfilePic, ChatUserInfo, ChatUserName } from "../../../styled_components/chatCard";

interface ChatCardProps {
  loggedUserId: number;
  userWithConversation: ShortedUser
}

export const ChatCard: React.FC<ChatCardProps> = ({ loggedUserId, userWithConversation }) => {
  return (
    <ChatCardContainer>
      <ChatProfilePic src={userWithConversation.pictureUrl} alt={userWithConversation.name} />
      <ChatUserInfo>
        <ChatUserName>{userWithConversation.name}</ChatUserName>
        {/* Puedes agregar más detalles aquí, como el último mensaje y la hora */}
      </ChatUserInfo>
    </ChatCardContainer>
  );
};
