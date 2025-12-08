import { useContext, useEffect, useState } from 'react'
import { User } from '../../interfaces/userInterface'
import './matchesPage.css'
import { UserContext } from '../../hooks/userContext'
import { getMatchedUsers } from '../../utils/petitionsToBackend'
import { MatchCard } from './MatchCard'
import { Layout } from '../../components/layout'
import { NoMatches } from './no-matches'
import { BackAllUsersButton } from '../../styled_components/backAllUsersButton'
import { goBackToMatches } from '../../utils/goBackToMatches'
import { SearcherBarForUsers } from '../../components/SearcherBarForUsers'

export const MatchesPage = () => {
  const user: User | null = useContext(UserContext).state.user;
  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);
  const [searcherTrigger, setSearcherTrigger] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      await getMatchedUsers(user, setMatchedUsers);
      setIsLoading(false);
    };
    fetchMatches();
  }, [user]);

  return (
    <Layout>
      <div className="match-container">
        {!isLoading && matchedUsers && matchedUsers.length > 0 && user ? (
          <>
            <div className="match-header">
              <h1 className='match-title'>Don't make them wait!</h1>
              
              {searcherTrigger ? (
                <SearcherBarForUsers
                  setSearcherTrigger={setSearcherTrigger} 
                  users={matchedUsers} 
                  setMatchedUsers={setMatchedUsers} 
                />
              ) : (
                <BackAllUsersButton onClick={() => goBackToMatches(setSearcherTrigger, setMatchedUsers, user)}>
                  ← Go back
                </BackAllUsersButton>
              )}
            </div>

            <div className="matches-list">
              {matchedUsers.map(user => (
                <MatchCard
                  key={user.id}
                  user={user}
                />
              ))}
            </div>
          </>
        ): !isLoading ? (
          <NoMatches />
        ) : null}
      </div>
    </Layout>
  )
}
