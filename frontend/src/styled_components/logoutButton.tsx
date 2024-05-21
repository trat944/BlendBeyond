import styled from 'styled-components';

export const SecondaryButton = styled.button`
  background-color: #f2f2f2;  
  color: #4ca2cd;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  width: 10rem;
  height: 3rem;
  border: 2px solid #4ca2cd;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  letter-spacing: 2px;
  text-align: center; 

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #4ca2cd;
    color: white;
  }
`;