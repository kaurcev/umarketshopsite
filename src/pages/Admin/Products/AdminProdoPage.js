import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import ProductBarAdmin from "../../../components/ProductBarAdmin";

export default function AdminProdoPage() {
  document.title = "Панель администратора | Товары";
  return (
    <>
      <Header />
      <main className="profile pay">
        <div className="w250">
          <Link className="bt" to="/profile/admin">
            Вернуться назад
          </Link>
        </div>
        <div className="page">
          <h3>Товары</h3>
          <p>Напоминаем, маркетплейс является третьим лицом между поставиками и покупателями и не занимается поставкой товаров. В этом и есть главное различие маркетплейса и интернет-магазина. </p>
          <p>Если Вам необходимо опубликовать свои товары от имени маркетплейса, рекомендуется <Link to="/profile/admin/user/add">создать профиль поставщика</Link> и <Link to="/profile/admin/provider/add">организацию-поставщика</Link> от имени маркетплейса.</p>
          <p>В роли администратора в системе вы можете ограничить организацию на продажу товаров.</p>
          <ProductBarAdmin />
        </div>
      </main>
      <Footer />
    </>
  );
}
