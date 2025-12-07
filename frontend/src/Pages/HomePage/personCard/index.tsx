import './personCard.css'
import { User } from "../../../interfaces/userInterface";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

type Props = {
    user: User | null
}

export const PersonCard = ({user}: Props) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className="personCard-wrapper">
            <div className="personCard-container">
                <img src={user?.pictureUrl} alt={user?.name} />
                
                {/* Info overlay for mobile - shown on click */}
                <div className={`personCard-info-overlay ${showInfo ? 'show' : ''}`}>
                    <div className="info-content">
                        <h2>{user?.name}, {user?.age}</h2>
                        <div className="info-item">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{user?.city}</span>
                        </div>
                        <p className="info-bio">Here you will have all the info, destinations, bucketlist, pictures...etc</p>
                    </div>
                </div>

                {/* Mobile: Click to toggle info */}
                <div 
                    className="personCard-mobile-trigger"
                    onClick={() => setShowInfo(!showInfo)}
                >
                    <div className="user-basic-info">
                        <span className='user-name-age'>{user?.name}, {user?.age}</span>
                        <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                    </div>
                </div>

                {/* Desktop: Info panel on the side */}
                <div className="personCard-desktop-info">
                    <div className="desktop-info-content">
                        <h2>{user?.name}, {user?.age}</h2>
                        <div className="info-item">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{user?.city}</span>
                        </div>
                        {/* Aquí puedes añadir más campos cuando los tengas */}
                        <div className="info-section">
                            <h3>About</h3>
                            <p>Here you will have all the info, destinations, bucketlist, pictures...etc</p>
                        </div>
                        <Link 
                            to={`/${user?.id}`} 
                            state={{ user }}
                            className="view-full-profile"
                        >
                            View Full Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}