import styled from 'styled-components';

export const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0.5rem 0;
`;

export const StyledLi = styled.li`
  background-color: #ffe0e9;
  border: 1px solid #ffb3c1;
  border-radius: 8px;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  color: #7a0032;
  display: flex;
  align-items: center;

  &::before {
    content: '⚠️';
    margin-right: 0.5rem;
  }
`;