import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FormPostavEdit from "../../components/FormPostavEdit";

export default function PostavEditPage() {
  document.title = "Панель поставщика | Редактирование";
  const navigate = useNavigate();
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
          <h4>ПАНЕЛЬ ПОСТАВЩИКА | РЕДАКТИРОВАНИЕ</h4>
          <FormPostavEdit />
        </div>
      </main>
      <Footer />
    </>
  );
}
