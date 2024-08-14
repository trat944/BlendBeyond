import { useContext, useEffect, useState } from 'react'
import { User } from '../../interfaces/userInterface'
import './matchesPage.css'
import { UserContext } from '../../hooks/userContext'
import { getMatchedUsers } from '../../utils/petitionsToBackend'
import { MatchCard } from './MatchCard'
import { Menu } from '../../components/Menu'
import { NoMatches } from './no-matches'
import { BackAllUsersButton } from '../../styled_components/backAllUsersButton'
import { goBackToMatches } from '../../utils/goBackToMatches'
import { SearcherBarForUsers } from '../../components/SearcherBarForUsers'

export const MatchesPage = () => {
  const user: User | null = useContext(UserContext).state.user;
  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);
  const [searcherTrigger, setSearcherTrigger] = useState(true)

  useEffect(() => {
    getMatchedUsers(user, setMatchedUsers);
  }, [user]);

  return (
      <>
        <div className="match-container">
        {matchedUsers && matchedUsers.length > 0 && user ? (
          <div>
            <h1 className='match-title'>Don’t make them wait!</h1>

            {searcherTrigger ? <SearcherBarForUsers
            setSearcherTrigger={setSearcherTrigger} 
            users={matchedUsers} 
            setMatchedUsers={setMatchedUsers} /> :
            (
              <BackAllUsersButton onClick={() => goBackToMatches(setSearcherTrigger, setMatchedUsers, user)}>Go back</BackAllUsersButton>
            )}

            {matchedUsers.map(user => (
              <MatchCard
                key={user.id}
                user={user}
              />
            ))}
          </div>
        ): (
          <NoMatches/>
        )}
        </div>
        <Menu />
      </>
  )
}
