import styled from 'styled-components';

export const DangerButton = styled.button`
  background-color: #ff4d4d;  
  color: white;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  width: 10rem;
  height: 3rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  letter-spacing: 2px;
  text-align: center; 

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #e04444;
  }
`;