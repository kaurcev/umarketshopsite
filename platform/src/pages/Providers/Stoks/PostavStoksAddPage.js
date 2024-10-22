import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import FormAddStoks from "../../../components/FormAddStoks";

export default function PostavStoksAddPage() {
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
        </div>
        <div className="page">
          <h3>Добавление акции</h3>
          <FormAddStoks />
        </div>
      </main>
      <Footer />
    </>
  );
}
