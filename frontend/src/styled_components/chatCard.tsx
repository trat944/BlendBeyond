import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ChatCardContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1rem 1.2rem;
  margin: 0.5rem 0;
  width: 100%;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 6px 20px rgba(76, 162, 205, 0.2);
    transform: translateY(-2px);
    border-color: rgba(76, 162, 205, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.9rem 1rem;
    gap: 1rem;
  }
`;

export const ChatProfilePic = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #4ca2cd, #67b26f) border-box;
  transition: transform 0.3s ease;
  flex-shrink: 0;

  ${ChatCardContainer}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    border-width: 2px;
  }
`;

export const ChatUserName = styled.span` 
  font-size: 17px;
  font-weight: 600;
  color: #2c3e50;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  letter-spacing: -0.2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ChatLastMessage = styled.span`
  font-size: 14px;
  color: #6c757d;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover, &:focus, &:active {
    text-decoration: none;
  }
`;