import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import StoksProvideBar from "../../../components/StoksProvideBar";

export default function PostavStoksPage() {
  const navigate = useNavigate();
  document.title = "Панель поставщика";

  return (
    <>
      <Header />
      <main className="profile pay">
        <div className="w250">
          <Link className="bt" onClick={() => navigate(-1)}>
            Вернуться назад
          </Link>
          <Link className="bt" to="/profile/postav/addstoks">
            Добавить акцию
          </Link>
        </div>
        <div className="page">
          <h3>Это все проводимые вами акции</h3>
          <StoksProvideBar />
        </div>
      </main>
      <Footer />
    </>
  );
}
