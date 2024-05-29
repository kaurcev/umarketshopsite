import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function NoAuthPage() {
  document.title = "Необходима авторизация";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <main className="centered">
        <h1>Ой</h1>
        <p>Кажется, что вы не авторизированы</p>
        <p className="mini">Чтобы открыть эту страницу необходимо быть авторизированным</p>
        <p>
          <Link className="bt" to="/auth">
            Перейти к авторизации
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
