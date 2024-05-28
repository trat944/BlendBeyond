import { Link } from 'react-router-dom';
import { User } from '../../../interfaces/userInterface'
import { Card, ProfilePic, UserInfo, UserName } from '../../../styled_components/matchCard';
import './matchCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { UserContext } from '../../../hooks/userContext';

type Props = {
  user: User
}

export const MatchCard = ({ user}: Props) => {
  const loggedUser: User | null = useContext(UserContext).state.user;

  const handleChat = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = event.target as HTMLElement;
    if (target.closest('.chat_icon')) {
      event.preventDefault();
      //start a chat
    }
  };

  return (
   <>
    <Link to={`/${user.id}`} state={{ user }}>
      <Card>
        <ProfilePic src={user.pictureUrl || './src/assets/th.jpg'} alt={user.name} />
        <FontAwesomeIcon onClick={(event) => handleChat(event)} className='chat_icon' icon={faComment} />
        <UserInfo>
          <UserName>{user.name}, {user.age ? user.age : 'Age not available'}</UserName>
        </UserInfo>
      </Card>
    </Link>
   </>
  );
};