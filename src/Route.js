import LandingPage from './pages/LandingPage';
import FAQPage from './pages/FAQPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TemplatesPage from './pages/TemplatesPage';
import ProfilePage from './pages/ProfilePage';
import EducationPage from './pages/EducationPage';
import ExperiencePage from './pages/ExperiencePage';
import OtherDetailsPage from './pages/OtherDetailsPage';

import RequireAuth from './components/RequireAuthComponent';
import { Routes, Route } from 'react-router-dom';


const RoutesConfig = () => {
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
      <Route path="/template-generate" element={<RequireAuth><TemplatesPage /></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
      <Route path="/education" element={<RequireAuth><EducationPage /></RequireAuth>} />
      <Route path="/experience" element={<RequireAuth><ExperiencePage /></RequireAuth>} />
      <Route path="/other-details" element={<RequireAuth><OtherDetailsPage /></RequireAuth>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};


export default RoutesConfig;