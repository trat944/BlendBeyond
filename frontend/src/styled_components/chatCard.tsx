import styled from 'styled-components';

export const ChatCardContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffe0e9;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin: 15px auto;
  width: 80%;
  max-width: 500px;
  border: 1px solid #ffb3c1;
`;

export const ChatProfilePic = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffb3c1;
  margin-right: 20px;
`;

export const ChatUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const ChatUserName = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #a60038;
  margin-bottom: 5px;
`;

export const ChatLastMessage = styled.span`
  font-size: 16px;
  color: #7a0032;
  margin-bottom: 5px;
`;

export const ChatMessageTime = styled.span`
  font-size: 14px;
  color: #7a0032;
  text-align: right;
`;