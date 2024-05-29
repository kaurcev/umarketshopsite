import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/profile.css";
import Footer from "../components/Footer";
import WalletCart from "../components/WalletCart";
import TreanksationBar from "../components/TranksationBar";
import NoAuthPage from "../pages/NoAuthPage";


export default function WalletPage() {
  const navigate = useNavigate();
  document.title = "Ваш кошелёк";

  if (!localStorage.getItem('token')) return (<><NoAuthPage /></>);
  return (
    <>
      <Header />
      <main className="profile pay">
        <div className="w250">
          <Link className="bt" onClick={() => navigate(-1)}>
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
