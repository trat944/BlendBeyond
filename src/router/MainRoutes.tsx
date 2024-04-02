
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../Pages/HomePage';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/homepage' element={<HomePage />} />
    </Routes>
  )
}