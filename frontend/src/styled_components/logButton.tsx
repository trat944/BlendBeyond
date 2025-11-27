import styled from 'styled-components';

export const LogButton = styled.button`
  background-color: #4ca2cd;  
  color: white;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 13px;
  font-weight: 600;
  width: 10rem;
  height: 2.8rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 2px;
  text-align: center; 
  box-shadow: 0 2px 8px rgba(76, 162, 205, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #3d8db5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 162, 205, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    font-size: 15px;
    width: 13rem;
    height: 3.5rem;
    letter-spacing: 3px;
    border-radius: 25px;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
    width: 15rem;
    height: 4rem;
    letter-spacing: 4px;
    border-radius: 30px;
  }
`;