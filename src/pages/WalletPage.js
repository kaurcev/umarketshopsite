import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/profile.css";
import Footer from "../components/Footer";
import WalletCart from "../components/WalletCart";
import TreanksationBar from "../components/TranksationBar";

export default function WalletPage() {
  document.title = "Ваш кошелёк";
  return (
    <>
      <Header />
      <main className="profile pay">
        <div className="w250">
          <Link className="bt" to="/profile">
            Вернуться назад
          </Link>
        </div>
        <div className="page">
          <WalletCart />
          <h4>ПОСЛЕДНИЕ ОПЕРАЦИИ</h4>
          <TreanksationBar />
        </div>
      </main>
      <Footer />
    </>
  );
}
