import { User } from '../../../interfaces/userInterface'
import './no-users.css'

type Props = {
    user: User | null
}

export const NoUsers = ({user}: Props) => {
    return (
        <div className="noUsersWomen-container">
            <img 
                className='noUsers-img' 
                src={user?.sex === 'man' ? 'src/assets/man_noUsers.png' : 'src/assets/woman_noUsers.png'} 
                alt="No more users" 
            />
            <span>No queda más gente en tu zona ¡Amplia tu área para conocer más gente!</span>
        </div>
    )
}