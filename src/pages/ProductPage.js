import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReviewsBar from "../components/ReviewsBar";
import FormAddRew from "../components/FormAddRew";
import ProductView from "../components/ProductView";
import E404Page from "./E404Page";

export default function ProductPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const proid = searchParams.get("id");

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей
  if (!proid) return (<E404Page />)
  return (
    <>
      <Header />
      <main className="productpage">
        <ProductView id={proid} />
        <FormAddRew id={proid} />
        <ReviewsBar id={proid} />
      </main>
      <Footer />
    </>
  );
}
