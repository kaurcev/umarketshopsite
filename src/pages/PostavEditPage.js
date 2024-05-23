import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormPostavEdit from "../components/FormPostavEdit";

export default function PostavEditPage() {
  document.title = "Панель поставщика | Редактирование";
  return (
    <>
      <Header />
      <main className="profile pay">
        <div className="w250">
          <Link className="bt" to="/profile/postav">
            Вернуться назад
          </Link>
        </div>
        <div className="page">
          <h4>ПАНЕЛЬ ПОСТАВЩИКА | РЕДАКТИРОВАНИЕ</h4>
          <FormPostavEdit />
        </div>
      </main>
      <Footer />
    </>
  );
}
