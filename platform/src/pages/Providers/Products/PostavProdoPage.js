import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../../components/Header";
import { serverUrl } from "../../../config";
import Footer from "../../../components/Footer";
import NoAuthPage from "../../NoAuthPage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import ModalAlert from "../../../components/ModalAlert";

export default function PostavProdoPage() {
  document.title = "Панель поставщика";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  // Для отображения модального окна
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const showModalWithText = (text) => {
    setModalText(text); // Устанавливаем текст для модального окна
    setShowModal(true); // Показываем модальное окно
    setTimeout(() => {
      setShowModal(false); // Автоматически скрываем модальное окно через 3 секунды
    }, 1500);
  };

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
        if (!jsonData.status) {
          showModalWithText("Кажется, что у вас нет товаров");
        }
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
      <ModalAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        text={modalText}
      />
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
                    <LazyLoadImage effect="blur"
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
