
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../Pages/HomePage';
import { ConfigPage } from '../Pages/ConfigPage';
import { MatchesPage } from '../Pages/MatchesPage';
import { PersonInfoPage } from '../Pages/PersonInfoPage';
import { useContext } from 'react';
import { User } from '../interfaces/userInterface';
import { UserContext } from '../hooks/userContext';
import { ChatsPage } from '../Pages/ChatsPage';
import { ConversationPage } from '../Pages/ConversationPage';

export const MainRoutes = () => {
  const loggedUser: User | null = useContext(UserContext).state.user
  return (
    <Routes>
      <Route path='/homepage' element={<HomePage />} />
      <Route path='/configpage' element={<ConfigPage />} />
      <Route path='/matches' element={<MatchesPage />} />
      <Route path='/chats' element={<ChatsPage />} />
      <Route path='/conversation/:id' element={<ConversationPage />} />
      <Route path='/:userId' element={<PersonInfoPage loggedUser={loggedUser}/>} />
    </Routes>
  )
}