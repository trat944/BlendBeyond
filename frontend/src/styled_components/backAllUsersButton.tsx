import styled from 'styled-components';

export const BackAllUsersButton = styled.button` 
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4ca2cd 0%, #67b26f 100%);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
  font-size: 16px;
  font-weight: 600;
  width: fit-content;
  min-width: 150px;
  height: 3rem;
  padding: 0 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(76, 162, 205, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #67b26f 0%, #4ca2cd 100%);
    transition: left 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 162, 205, 0.4);
  }

  &:hover::before {
    left: 0;
  }

  &:active {
    transform: translateY(0);
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;