import { useContext, useEffect, useState } from 'react'
import { Layout } from '../../components/layout'
import { User } from '../../interfaces/userInterface'
import './matchesPage.css'
import { UserContext } from '../../hooks/userContext'
import { getMatchedUsers } from '../../utils/getUsersFunctions'
import { MatchCard } from './MatchCard'

export const MatchesPage = () => {
  const user: User | null = useContext(UserContext).state.user;
  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);

  useEffect(() => {
    getMatchedUsers(user, setMatchedUsers);
  }, [user]);

  return (
    <Layout>
      {matchedUsers && matchedUsers.length > 0 && (
        matchedUsers.map(user => {
          return <MatchCard
          key={user.id}
          user={user}
          />
        })
      )}
    </Layout>
  )
}
