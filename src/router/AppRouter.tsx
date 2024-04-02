import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../Pages/Login';
import { PrivateRoute } from './PrivateRoutes';
import { MainRoutes } from './MainRoutes';
import { UserProvider } from '../hooks/userContext';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element= { <LoginPage/> } />
        
          <Route path='/*' element={
            <PrivateRoute>
              <MainRoutes />
            </PrivateRoute>
          } />
        
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}