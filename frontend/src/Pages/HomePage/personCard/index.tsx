import './personCard.css'
import { User } from "../../../interfaces/userInterface";
import { useNavigate } from 'react-router-dom';

type Props = {
    user: User | null
}

export const PersonCard = ({user}: Props) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/${user?.id}`, { state: { user } });
    };

    return (
        <div className="personCard-wrapper">
            <div className="personCard-container" onClick={handleCardClick}>
                <img src={user?.pictureUrl} alt={user?.name} />
                
                {/* Información básica siempre visible */}
                <div className="personCard-info-bar">
                    <span className='user-name-age'>{user?.name}, {user?.age}</span>
                </div>
            </div>
        </div>
    )
}