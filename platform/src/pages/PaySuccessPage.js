import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function PaySuccessPage() {
  document.title = "Баланс пополнен!";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <main className="centered">
        <h1>Платёж принят!</h1>
        <p>Скоро ваши средства поступят на ваш счёт</p>
        <p>
          <Link className="bt" to="/profile/wallet">
            Вернуться в кошелёк
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
