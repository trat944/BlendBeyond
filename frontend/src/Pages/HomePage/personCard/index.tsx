import './personCard.css'
import { User } from "../../../interfaces/userInterface";

type Props = {
    user: User | null
}

export const PersonCard = ({user}: Props) => {
    return (
        <div className="personCard-container">
            <img src={user?.pictureUrl} alt="" />
            <span className='user_specifics'>{user?.name}, {user?.age}</span>
        </div>
    )
}