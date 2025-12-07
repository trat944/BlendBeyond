import { User } from '../../../interfaces/userInterface'
import './no-users.css'

type Props = {
    user: User | null
}

export const NoUsers = ({user}: Props) => {
    return (
        <div className="noUsers-container">
            <img 
                className='noUsers-img' 
                src={user?.sex === 'man' ? '/man_noUsers.png' : '/woman_noUsers.png'} 
                alt="No more users" 
            />
            <span>No more people closeby! Widen your area to meet more people!</span>
        </div>
    )
}