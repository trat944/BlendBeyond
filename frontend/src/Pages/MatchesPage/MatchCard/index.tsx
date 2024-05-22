import { Link } from 'react-router-dom';
import { User } from '../../../interfaces/userInterface'
import { Card, ProfilePic, UserAge, UserInfo, UserName } from '../../../styled_components/matchCard';
import './matchCard.css'

type Props = {
  user: User
}

export const MatchCard = ({ user }: Props) => {
  return (
    <Link to={`/${user.id}`} state={{ user }}>
      <Card>
        <ProfilePic src={user.pictureUrl || './src/assets/th.jpg'} alt={user.name} />
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserAge>{user.age ? user.age : 'Age not available'}</UserAge>
        </UserInfo>
      </Card>
    </Link>
  );
};