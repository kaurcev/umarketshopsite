import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import E404Page from './pages/E404Page';
import ProfilePage from './pages/ProfilePage';
import LogoutPage from './pages/LogoutPage';
import ProfileEditPage from './pages/ProfileEditPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/auth" element={<AuthPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/profile/edit" element={<ProfileEditPage />} />
        <Route exact path="/logout" element={<LogoutPage />} />
        <Route path="*" element={<E404Page />} />
      </Routes>
    </Router>
  );
}

export default App;

