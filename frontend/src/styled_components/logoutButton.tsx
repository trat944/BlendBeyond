import styled from 'styled-components';

export const SecondaryButton = styled.button`
  background-color: #f2f2f2;  
  color: #4ca2cd;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 13px;
  font-weight: 600;
  width: 8rem;
  height: 2.5rem;
  border: 2px solid #4ca2cd;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  text-align: center; 

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #4ca2cd;
    color: white;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    font-size: 15px;
    width: 9.5rem;
    height: 2.8rem;
    letter-spacing: 1.5px;
    border-radius: 18px;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
    width: 10rem;
    height: 3rem;
    letter-spacing: 2px;
    border-radius: 20px;
  }
`;