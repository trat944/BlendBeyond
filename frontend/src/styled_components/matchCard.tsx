import styled from 'styled-components';

export const Card = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem 2.5rem;
  margin: 10px auto;
  width: 70%;
`;

export const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
`;

export const UserName = styled.span`
  display: flex;
  justify-content: right;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;