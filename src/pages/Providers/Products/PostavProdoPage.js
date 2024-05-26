import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../../components/Header";
import { serverUrl } from "../../../config";
import Footer from "../../../components/Footer";

export default function PostavProdoPage() {
  document.title = "Панель поставщика";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const params = new URLSearchParams();
        params.append("me", localStorage.getItem("token"));
        const response = await fetch(
          `//${serverUrl}/provider/myproducts?${params.toString()}`
        );
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  //

  const openeitprodo = async (id) => {
    navigate(`/profile/postav/editprodo?id=${id}`);
  };

  const openprodo = async (id) => {
    navigate(`/product?id=${id}`);
  };

  const dropprodo = async (id, img) => {
    try {
      const params = new URLSearchParams();
      params.append("id", id);
      params.append("me", localStorage.getItem("token"));
      params.append("img", img);
      const response = await fetch(
        `//${serverUrl}/product/del?${params.toString()}`
      );
      const jsonData = await response.json();
      if (jsonData.status) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        // alert("Удалено");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!localStorage.getItem('token')) return (<><NoAuthPage /></>);
  return (
    <>
      <Header />
      <main className="profile pay">
        <div className="w250">
          <Link className="bt" onClick={() => navigate(-1)}>
            Вернуться назад
          </Link>
          <Link className="bt" to="/profile/postav/addprodo">
            Добавить товар
          </Link>
        </div>
        <div className="page">
          <h3>Это все все поставляемые Вами товары</h3>
          <p className="mini">Соблюдайте правила нашей площадки!!!</p>
          <div className="productbar">
            {loading ? (
              <>Загрузка</>
            ) : (
              <>
                {data.map((item) => (
                  <div className="productcart" key={item.id}>
                    <img
                      src={`//${serverUrl}/img/${item.img}`}
                      alt={item.name}
                    />
                    <p className="money">{item.coste}₽</p>
                    <h5>{item.name}</h5>
                    <p className="desc mini">{item.description}</p>
                    <button className="o" onClick={() => openeitprodo(item.id)}>
                      Редактировать
                    </button>
                    <button onClick={() => openprodo(item.id)}>Открыть</button>
                    <button
                      className="red"
                      onClick={() => dropprodo(item.id, item.img)}
                    >
                      Удалить
                    </button>
                  </div>
                ))}
                <div className="productcart fill"></div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
