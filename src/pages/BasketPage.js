import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { serverUrl } from "../config";
import Footer from "../components/Footer";
import ModalAlert from "../components/ModalAlert";
import ProductBarloader from "../components/ProductBarloader";
import NoAuthPage from "./NoAuthPage";
import PayAlert from "../components/PayAlert";


export default function BasketPage() {
  document.title = "Ваша корзина";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paycode, setPaycode] = useState();
  const [postav, setPostav] = useState();
  const [basket, setPayBasket] = useState();
  const [money, setMoney] = useState();

  // Для отображения модального окна
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const showModalWithText = (text) => {
    setModalText(text); // Устанавливаем текст для модального окна
    setShowModal(true); // Показываем модальное окно
    setTimeout(() => {
      setShowModal(false); // Автоматически скрываем модальное окно через 3 секунды
    }, 3000);
  };


  const [showComplaint, setShowComplaint] = useState(false);
  const [typeComplaint, setTypeComplaint] = useState("");

  const showComplaintAlert = () => {
    setShowComplaint(true); // Показываем модальное окно
  };

  const GoToPay = (id, basket, postav, money) => {
    setPaycode(id);
    setPayBasket(basket);
    setPostav(postav);
    setMoney(money);
    setTypeComplaint("1");
    showComplaintAlert();
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("me", localStorage.getItem("token"));
        const responses = await fetch(
          `//${serverUrl}/basket?${params.toString()}`
        );
        const jsonTrans = await responses.json();
        setData(jsonTrans.data);
      } catch (error) {
        showModalWithText(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  const dropbasket = async (id) => {
    try {
      const params = new URLSearchParams();
      params.append("id", id);
      params.append("me", localStorage.getItem("token"));
      const response = await fetch(
        `//${serverUrl}/basket/del?${params.toString()}`
      );
      const jsonData = await response.json();
      if (jsonData.status) {
        showModalWithText("Удалено");
        setData((prevData) => prevData.filter((item) => item.id !== id));
      }
    } catch (error) {
      showModalWithText(error.message);
    }
  };

  const openprodo = async (id) => {
    navigate(`/product?id=${id}`);
  };

  if (!localStorage.getItem('token')) return (<><NoAuthPage /></>);
  return (
    <>
      <Header />
      <ModalAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        text={modalText}
      />
      <PayAlert
        show={showComplaint}
        type={typeComplaint}
        product={paycode}
        basket={basket}
        postav={postav}
        money={money}
        onClose={() => setShowComplaint(false)}
      />
      <main className="profile pay">
        <div className="w250">
          <Link className="bt" onClick={() => navigate(-1)}>
            Вернуться назад
          </Link>
        </div>
        <div className="page">
          <h4>Ваша корзина</h4>
          <p className="mini">
            Это ваша корзина. Тут отображаются товары. которые вы добавили в
            корзину
          </p>
          <>
            <div className="productbar">
              {loading ? (
                <>
                  <ProductBarloader />
                </>
              ) : (
                <>
                  {data.length < 1 ? (
                    <>
                      <div className="noauth">
                        Вы ещё ничего не добавили в свою корзину
                      </div>
                    </>
                  ) : (
                    <>
                      {data.map((item) => (
                        <div className="productcart" key={item.id}>
                          <img
                            src={`//${serverUrl}/img/${item.img}`}
                            alt={item.name}
                          />
                          <p class="money">{item.money} ₽</p>
                          <h5>{item.name}</h5>
                          <p className="desc mini">{item.description}</p>
                          <button
                            onClick={() => GoToPay(item.product_id, item.id, item.postav, item.money)}
                          >
                            Перейти к оформлению
                          </button>
                          <button
                            className="o"
                            onClick={() => openprodo(item.product_id)}
                          >
                            Открыть товар
                          </button>
                          <button
                            className="red"
                            onClick={() => dropbasket(item.id)}
                          >
                            Удалить
                          </button>
                        </div>
                      ))}
                      <div className="productcart fill"></div>
                    </>
                  )}
                </>
              )}
            </div>
          </>
        </div>
      </main>
      <Footer />
    </>
  );
}
