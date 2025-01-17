import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import FormEditStoks from "../../../components/FormEditStoks";

export default function PostavStoksEditPage() {
  const navigate = useNavigate();
  document.title = "Панель поставщика";

  return (
    <>
      <Header />
      <main className="profile pay">
        <div className="w250">
          <Link className="bt" onClick={() => navigate(-2)}>
            Вернуться назад
          </Link>
        </div>
        <div className="page">
          <h3>Добавление акции</h3>
          <FormEditStoks />
        </div>
      </main>
      <Footer />
    </>
  );
}
