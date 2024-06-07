import { User } from '../../../interfaces/userInterface'
import { Card, ProfilePic, UserName } from '../../../styled_components/matchCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { UserContext } from '../../../hooks/userContext';
import { StyledLink } from '../../../styled_components/chatCard';
import './matchCard.css'

type Props = {
  user: User
}

export const MatchCard = ({ user}: Props) => {
  const loggedUser: User | null = useContext(UserContext).state.user;
  const loggedUserId = loggedUser?.id

  return (
   <>
      <Card>
        <ProfilePic src={user.pictureUrl || './src/assets/th.jpg'} alt={user.name} />
        <div className="icon-container">
          <StyledLink to={`/${user.id}`} state={{ user }}>
            <FontAwesomeIcon icon={faUser} />
          </StyledLink>
          <StyledLink to={`/conversation/${user.id}`} state={{ user, loggedUserId }}>
            <FontAwesomeIcon  className='chat_icon' icon={faComment} />
          </StyledLink>
        </div>
        <UserName>{user.name}, {user.age ? user.age : 'Age not available'}</UserName>
      </Card>
   </>
  );
};