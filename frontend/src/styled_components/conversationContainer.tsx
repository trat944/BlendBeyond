import styled from 'styled-components';

export const ConversationContainer = styled.div`
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  height: 600px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow: hidden;
  position: relative;
`;

export const ConversationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffe0e9;
  padding: 1rem;
  border-bottom: 1px solid #ffb3c1;
`;

export const ConversationUserDetails = styled.div`
  display: flex;
  align-items: center;
`;

export const ConversationUserPhoto = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ffb3c1;
  margin-right: 10px;
`;

export const ConversationUserName = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #a60038;
`;

export const Messages = styled.div`
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  justify-content: flex-end;
`;

export const MessageInputContainer = styled.div`
  display: flex;
  padding: 1rem;
  background-color: #ffe0e9;
  border-top: 1px solid #ffb3c1;
`;

export const MessageInput = styled.input`
  flex-grow: 1;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #ffb3c1;
  outline: none;
  font-size: 1rem;
  margin-right: 1rem;
`;
