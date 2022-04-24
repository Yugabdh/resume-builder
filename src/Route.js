import { useSelector } from 'react-redux';

import { selectUser } from './redux/userSlice';

import LandingPage from './pages/LandingPage';
import FAQPage from './pages/FAQPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

import RequireAuth from './components/RequireAuthComponent';
import { Routes, Route } from 'react-router-dom';


const RoutesConfig = () => {
  const user = useSelector(selectUser);

  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/faq" element={<FAQPage />} />
      {
      user ?
        <>
          <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        </>
      : 
        <>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </>
      }
    </Routes>
  );
};


export default RoutesConfig;