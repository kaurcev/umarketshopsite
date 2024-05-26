import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import E404Page from "./pages/E404Page";
import LogoutPage from "./pages/LogoutPage";
import E500Page from "./pages/E500Page";
import ApplicationPage from "./pages/ApplicationPage";
import StartProvidePage from "./pages/StartProviderPage";
import StocksPage from "./pages/StocksPage";
import BasketPage from "./pages/BasketPage";
import HelpPage from "./pages/HelpPage";
import WalletPage from "./pages/WalletPage";
import SearchPage from "./pages/SearchPage";
import ProductPage from "./pages/ProductPage";
import Signup from "./pages/SignupPage";
import PaySuccessPage from "./pages/PaySuccessPage";
import StokPage from "./pages/StokPage";
import CountryError from "./pages/CountryError";

// Страницы раздела профиля
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileEditPage from "./pages/Profile/ProfileEditPage";

// Страницы раздела профиля поставщика
import PostavPage from "./pages/Providers/PostavPage";
import PostavEditPage from "./pages/Providers/PostavEditPage";
import PostavProdoPage from "./pages/Providers/Products/PostavProdoPage";
import PostavProdoAddPage from "./pages/Providers/Products/PostavProdoAddPage";
import PostavProdoEditPage from "./pages/Providers/Products/PostavProdoEditPage";
import PostavStoksPage from "./pages/Providers/Stoks/PostavStoksPage";
import PostavStoksAddPage from "./pages/Providers/Stoks/PostavStoksAddPage";
import PostavStoksEditPage from "./pages/Providers/Stoks/PostavStoksEditPage";
import ReplyPage from "./pages/Providers/PeplysProdo/ReplyPage";
import ReplysPage from "./pages/Providers/PeplysProdo/ReplysPage";

// Страницы раздела профиля администратора
import AdminPage from "./pages/Admin/AdminPage";
import AdminUsersPage from "./pages/Admin/Users/AdminUsersPage";
import AdminUserEditPage from "./pages/Admin/Users/AdminUserEditPage";
import AdminUserAddPage from "./pages/Admin/Users/AdminUserAddPage";
import AdminProdoPage from "./pages/Admin/Products/AdminProdoPage";
import AdminProvidersPage from "./pages/Admin/Providers/AdminProvidersPage";
import AdminProviderEditPage from "./pages/Admin/Providers/AdminProviderEditPage";
import AdminProviderAddPage from "./pages/Admin/Providers/AdminProviderAddPage";
import AdminComplaintsPage from "./pages/Admin/Complaints/AdminComplaintsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<HomePage />} />
        <Route
          exact
          path="/auth"
          element={<AuthPage />} />
        <Route
          exact
          path="/profile"
          element={<ProfilePage />} />
        <Route
          exact
          path="/profile/edit"
          element={<ProfileEditPage />} />
        <Route
          exact
          path="/logout"
          element={<LogoutPage />} />
        <Route
          exact
          path="/application"
          element={<ApplicationPage />} />
        <Route
          exact
          path="/startposrav"
          element={<StartProvidePage />} />
        <Route
          exact
          path="/stocks"
          element={<StocksPage />} />
        <Route
          exact
          path="/stock"
          element={<StokPage />} />
        <Route
          exact
          path="/basket"
          element={<BasketPage />} />
        <Route
          exact
          path="/help"
          element={<HelpPage />} />
        <Route
          exact
          path="/pay/success"
          element={<PaySuccessPage />} />
        <Route
          exact
          path="/product"
          element={<ProductPage />} />
        <Route
          exact
          path="/profile/admin/users"
          element={<AdminUsersPage />} />
        <Route
          exact
          path="/profile/admin/user/edit"
          element={<AdminUserEditPage />} />
        <Route
          exact
          path="/profile/admin/user/add"
          element={<AdminUserAddPage />} />
        <Route
          exact
          path="/profile/admin/providers"
          element={<AdminProvidersPage />} />
        <Route
          exact
          path="/profile/admin/provider/edit"
          element={<AdminProviderEditPage />} />
        <Route
          exact
          path="/profile/admin/provider/add"
          element={<AdminProviderAddPage />} />
        <Route
          exact
          path="/profile/admin/complaints"
          element={<AdminComplaintsPage />} />
        <Route
          exact
          path="/profile/admin/prodo"
          element={<AdminProdoPage />} />
        <Route
          exact
          path="/profile/admin"
          element={<AdminPage />} />
        <Route
          exact
          path="/profile/postav"
          element={<PostavPage />} />
        <Route
          exact
          path="/profile/postav/prodo"
          element={<PostavProdoPage />}
        />
        <Route
          exact
          path="/profile/postav/addprodo"
          element={<PostavProdoAddPage />}
        />
        <Route
          exact
          path="/profile/postav/stoks"
          element={<PostavStoksPage />}
        />
        <Route
          exact
          path="/profile/postav/addstoks"
          element={<PostavStoksAddPage />}
        />
        <Route
          exact
          path="/profile/postav/editstoks"
          element={<PostavStoksEditPage />}
        />
        <Route
          exact
          path="/profile/postav/editprodo"
          element={<PostavProdoEditPage />}
        />
        <Route
          exact
          path="/profile/postav/replys"
          element={<ReplysPage />} />
        <Route
          exact
          path="/profile/postav/reply"
          element={<ReplyPage />} />
        <Route
          exact
          path="/profile/postav/edit"
          element={<PostavEditPage />} />
        <Route
          exact
          path="/profile/wallet"
          element={<WalletPage />} />
        <Route
          exact
          path="/search"
          element={<SearchPage />} />
        <Route
          exact
          path="/signup"
          element={<Signup />} />
        <Route
          exact
          path="/500"
          element={<E500Page />} />
        <Route
          exact
          path="/oops"
          element={<CountryError />} />
        <Route
          path="*"
          element={<E404Page />} />
      </Routes>
    </Router>
  );
}

export default App;
