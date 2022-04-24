import LandingPage from './pages/LandingPage';
import FAQPage from './pages/FAQPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


import RequireAuth from './components/RequireAuthComponent';
import { Routes, Route } from 'react-router-dom';


const RoutesConfig = () => {
  const { currentUser } = false;
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/faq" element={<FAQPage />} />
      {
      currentUser ?
        <>
          <Route path="/dashboard" element={<RequireAuth><></></RequireAuth>} />
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