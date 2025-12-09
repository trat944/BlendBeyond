import { User } from '../../../interfaces/userInterface'
import './no-matches.css'

type Props = {
    user: User | null
}

export const NoMatches = ({user}: Props) => {
  return (
    <div className="noMatches-container">
      <img 
          className='noMatches-img'
          src={user?.sex === 'man' ? '/man_noUsers.png' : '/woman_noUsers.png'} 
          alt="No matches" 
      />
      <span>You don´t have any matches yet!</span>
    </div>
  )
}

