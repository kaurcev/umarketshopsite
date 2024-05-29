import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import FormSignIn from "../components/FormSignIn";

export default function AuthPage() {
  document.title = "Вы уже авторизированы";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <main className="centered">
        {localStorage.getItem("token") ? (
          <>
            <p>Вы уже авторизированы</p>
            <p>
              <Link to="/profile">Перейти</Link>
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
