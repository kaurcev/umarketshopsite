import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormAddProdo from "../components/FormAddProdo";

export default function PostavProdoAddPage() {
  document.title = "Панель поставщика";

  return (
    <>
      <Header />
      <main className="profile pay">
        <div className="w250">
          <Link className="bt" to="/profile/postav/prodo">
            Вернуться назад
          </Link>
        </div>
        <div className="page">
          <h3>Добавление товара</h3>
          <FormAddProdo />
        </div>
      </main>
      <Footer />
    </>
  );
}
