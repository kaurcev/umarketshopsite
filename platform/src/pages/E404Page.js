import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import E404 from "../img/E404.png";
import Footer from "../components/Footer";

export default function E404Page() {
  document.title = "404 - Страница не найдена";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <main className="centered">
        <img src={E404} alt="404" />
        <h1>404</h1>
        <p>Страница не найдена</p>
        <p className="mini">Страница была удалена или не существовала вовсе</p>
        <p>
          <Link className="bt" to="/">
            Вернуться на главную
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
