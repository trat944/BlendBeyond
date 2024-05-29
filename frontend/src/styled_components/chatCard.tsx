import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ChatCardContainer = styled.div`
  position: relative;
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

export const ChatUserName = styled.span` 
  font-size: 20px;
  font-weight: bold;
  color: #a60038;
  margin-right: 1rem;
`;

export const ChatLastMessage = styled.span`
  flex-grow: 1; 
  font-size: 1.1rem;
  color: #7a0032;
  text-align: right;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Familia de fuentes */
  font-weight: 400; /* Peso de la fuente */
  line-height: 1.4; /* Altura de línea */
  opacity: 0.8; /* Opacidad del texto */
  transition: opacity 0.3s ease; /* Transición suave de la opacidad */
  
  &:hover {
    opacity: 1; /* Opacidad completa al pasar el cursor sobre el mensaje */
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover, &:focus, &:active {
    text-decoration: none;
  }
`;