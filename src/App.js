import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import E404Page from './pages/E404Page';
import ProfilePage from './pages/ProfilePage';
import LogoutPage from './pages/LogoutPage';
import ProfileEditPage from './pages/ProfileEditPage';
import E500Page from './pages/E500Page';
import ApplicationPage from './pages/ApplicationPage';
import StartProvidePage from './pages/StartProviderPage';
import StocksPage from './pages/StocksPage';
import BasketPage from './pages/BasketPage';
import HelpPage from './pages/HelpPage';
import WalletPage from './pages/WalletPage';
import AdminPage from './pages/AdminPage';
import PostavPage from './pages/PostavPage';
import SearchPage from './pages/SearchPage';
import PostavEditPage from './pages/PostavEditPage';
import ProductPage from './pages/ProductPage';
import PostavProdoPage from './pages/PostavProdoPage';
import PostavProdoAddPage from './pages/PostavProdoAddPage';
import PostavProdoEditPage from './pages/PostavProdoEditPage';
import Signup from './pages/SignupPage';
import PaySuccessPage from './pages/PaySuccessPage';
import PostavStoksPage from './pages/PostavStoksPage';
import PostavStoksAddPage from './pages/PostavStoksAddPage';
import PostavStoksEditPage from './pages/PostavStoksEditPage';
import StokPage from './pages/StokPage';
import CountryError from './pages/CountryError';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/auth" element={<AuthPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/profile/edit" element={<ProfileEditPage />} />
        <Route exact path="/logout" element={<LogoutPage />} />
        <Route exact path="/application" element={<ApplicationPage />} />
        <Route exact path="/startposrav" element={<StartProvidePage />} />
        <Route exact path="/stocks" element={<StocksPage />} />
        <Route exact path="/stock" element={<StokPage />} />
        <Route exact path="/basket" element={<BasketPage />} />
        <Route exact path="/help" element={<HelpPage />} />
        <Route exact path="/pay/success" element={<PaySuccessPage />} />
        <Route exact path="/product" element={<ProductPage />} />
        <Route exact path="/profile/admin" element={<AdminPage />} />
        <Route exact path="/profile/postav" element={<PostavPage />} />
        <Route exact path="/profile/postav/prodo" element={<PostavProdoPage />} />       
        <Route exact path="/profile/postav/addprodo" element={<PostavProdoAddPage />} /> 
        <Route exact path="/profile/postav/stoks" element={<PostavStoksPage />} /> 
        <Route exact path="/profile/postav/addstoks" element={<PostavStoksAddPage />} /> 
        <Route exact path="/profile/postav/editstoks" element={<PostavStoksEditPage />} /> 
        <Route exact path="/profile/postav/editprodo" element={<PostavProdoEditPage />} />       
        <Route exact path="/profile/postav/edit" element={<PostavEditPage />} />
        <Route exact path="/profile/wallet" element={<WalletPage />} />
        <Route exact path="/search" element={<SearchPage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/500" element={<E500Page />} />
        <Route exact path="/oops" element={<CountryError />} />
        <Route path="*" element={<E404Page />} />
      </Routes>
    </Router>
  );
}

export default App;

