import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../Pages/Login';
import { PrivateRoute } from './PrivateRoutes';
import { MainRoutes } from './MainRoutes';
import { UserProvider } from '../hooks/userContext';
import { SocketContextProvider } from '../hooks/socketContext';

export const AppRouter = () => {

  return (
    <BrowserRouter>
      <UserProvider>
        <SocketContextProvider>
          <Routes>
            <Route path='/' element= { <LoginPage/> } />
          
            <Route path='/*' element={
              <PrivateRoute>
                <MainRoutes />
              </PrivateRoute>
            } />
          
          </Routes>
        </SocketContextProvider>
      </UserProvider>
    </BrowserRouter>
  )
}
