import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import E500 from "../img/E500.png";
import { serverUrl } from "../config";
import Footer from "../components/Footer";

export default function E500Page() {
  document.title = "Технические работы";
  const navigate = useNavigate();
  useEffect(() => {
    const getStatus = async () => {
      fetch(`//${serverUrl}/live`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            navigate("/");
          }
        })
        .catch((error) => {
          // alert(error);
        });
    };
    getStatus();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей
  return (
    <>
      <main className="centered">
        <img src={E500} alt="500" />
        <h1>Упс</h1>
        <p>Ваше интернет-соединение не стабильно</p>
        <p>Перезагрузите страницу и повторите действие.</p>
        <p className="mini">
          Если данная ошибка не пропала по истечению длительного строка,
          напишите нам на info@umarketshop.site
        </p>
      </main>
      <Footer />
    </>
  );
}
