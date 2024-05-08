
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../Pages/HomePage';
import { ConfigPage } from '../Pages/ConfigPage';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/homepage' element={<HomePage />} />
      <Route path='/configpage' element={<ConfigPage />} />
    </Routes>
  )
}