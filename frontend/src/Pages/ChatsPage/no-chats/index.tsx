import { User } from '../../../interfaces/userInterface'
import './no-chats.css'

type Props = {
    user: User | null
}

export const NoChats = ({user}: Props) => {
  return (
    <div className="noChats-container">
      <img  
          src={user?.sex === 'man' ? '/man_noUsers.png' : '/woman_noUsers.png'} 
          alt="No open conversations" 
      />
      <span>No open conversations!</span>
    </div>
  )
}