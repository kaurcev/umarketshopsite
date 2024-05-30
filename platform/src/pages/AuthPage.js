import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import FormSignIn from "../components/FormSignIn";

export default function AuthPage() {
  const navigate = useNavigate();
  document.title = "Вы уже авторизированы";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const umarketAuth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    document.cookie = `token=${localStorage.getItem("token")}; expires=${date.toUTCString()}; domain=.umarketshop.site; path=/`;
    navigate(-2);
  }


  return (
    <>
      <main className="centered">
        {localStorage.getItem("token") ? (
          <>
            <h3>Вы уже авторизированы</h3>
            <p>Вы можете продолжить пользоваться нашей площадкой.</p>
            <p>
              <Link className="bt o" onClick={() => umarketAuth()}><i class="fa fa-sign-in" aria-hidden="true"></i> Авторизироваться в системе юМаркет Шопа</Link>
            </p>
            <p>
              <Link className="bt" to="/profile">Перейти в профиль</Link>
            </p>
          </>
        ) : (
          <>
            <FormSignIn />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
