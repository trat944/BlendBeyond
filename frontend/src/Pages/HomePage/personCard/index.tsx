import './personCard.css'
import { User } from "../../../interfaces/userInterface";
import { Link } from 'react-router-dom';

type Props = {
    user: User | null
}

export const PersonCard = ({user}: Props) => {
    return (
        <Link to={`/${user?.id}`} state={{ user }}>
            <div className="personCard-container">
                <img src={user?.pictureUrl} alt="" />
                <span className='user_specifics'>{user?.name}, {user?.age}</span>
            </div>
        </Link>
    )
}