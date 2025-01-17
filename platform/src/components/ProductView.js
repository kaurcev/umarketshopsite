import React, { useState, useEffect } from "react";
import { serverUrl } from "../config";
import { useNavigate } from "react-router-dom";
import ModalAlert from "./ModalAlert";
import ComplaintAlert from "./ComplaintAlert";
import "../styles/ProductView.css";
import ProdImgBar from "./ProdImgBar";
import PayAlert from "../components/PayAlert";

const ProductView = ({ id }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [basketadd, setBasketadd] = useState(false);

  const [paycode, setPaycode] = useState();
  const [postav, setPostav] = useState();
  const [basket, setPayBasket] = useState();
  const [money, setMoney] = useState();



  const [showPay, setShowPay] = useState(false);
  const showPayAlert = () => {
    setShowPay(true); // Показываем модальное окно
  };
  const GoToPay = (id, basket, postav, money, oldmoney) => {
    setPaycode(id);
    setPayBasket(basket);
    setPostav(postav);
    setMoney(money);
    if (oldmoney != null) {
      setMoney(oldmoney);
    }
    showPayAlert();
  }




  const [showComplaint, setShowComplaint] = useState(false);
  const [typeComplaint, setTypeComplaint] = useState("");

  const showComplaintAlert = () => {
    setShowComplaint(true); // Показываем модальное окно
  };

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
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("id", id);
        const responses = await fetch(
          `//${serverUrl}/product?${params.toString()}`
        );
        const JsonData = await responses.json();
        setData(JsonData.data);
      } catch (error) {
        showModalWithText(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  async function FromBasket() {
    try {
      setBasketadd(true);
      const params = new URLSearchParams();
      params.append("product", id);
      params.append("me", localStorage.getItem("token"));
      const responses = await fetch(
        `//${serverUrl}/addbasket?${params.toString()}`
      );
      const jsonTrans = await responses.json();
      if (jsonTrans.status) {
        showModalWithText("Добавлено");
      } else {
        showModalWithText("Ошибка при добавлении товара в корзину :(");
      }
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setBasketadd(false);
    }
  }

  const share = () => {
    navigator.clipboard
      .writeText(
        `Посмотрите на ${data.name} по ссылке ${window.location.href} на юМаркет Шоп!`
      )
      .then(() => console.log("Done!"))
      .catch((err) => console.error(err));
    showModalWithText("Ссылка скопирована");
  };

  const StockOpen = (sid) => {
    navigate(`/stock?id=${sid}`);
  };

  const ComplaintProdo = () => {
    setTypeComplaint("1");
    showComplaintAlert();
  }

  if (!id) return null;
  return (
    <>
      <ModalAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        text={modalText}
      />
      <ComplaintAlert
        show={showComplaint}
        type={typeComplaint}
        to={id}
        onClose={() => setShowComplaint(false)}
      />
      <PayAlert
        show={showPay}
        product={paycode}
        basket={basket}
        postav={postav}
        money={money}
        wallet={localStorage.getItem("wallet")}
        onClose={() => setShowPay(false)}
      />
      {loading ? (
        <>
          <h1>
            <span onClick={() => navigate(-1)}>
              <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
            </span>
            <div className="skelet-loader h1"></div>
          </h1>
          <hr />
          <div className="duob">
            <div className="linkpanel">
              <div className="skelet-loader span"></div>
            </div>
            <span className="mini">
              <div className="skelet-loader span"></div>
            </span>
          </div>
          <div className="duo">
            <img className="skelet-loader" src="#" alt="" />
            <div className="dop">
              <>
                <div className="moneycart">
                  <div className="skelet-loader h1"></div>
                </div>
                <button className="skelet-loader"></button>
                <div className="postavprofile">
                  <p className="mini">Связаться с поставщиком</p>
                  <div className="skelet-loader p"></div>
                  <div className="skelet-loader p"></div>
                  <div className="skelet-loader p"></div>
                  <p className="mini">Адрес отправки</p>
                  <div className="skelet-loader p"></div>
                </div>
              </>
            </div>
          </div>
          <h4>Полное название</h4>
          <div className="skelet-loader p"></div>
          <h4>Описание</h4>
          <div className="skelet-loader p"></div>
          <div className="skelet-loader p"></div>
          <div className="skelet-loader p"></div>
          <div className="skelet-loader p"></div>
          <div className="skelet-loader p"></div>
        </>
      ) : (
        <>
          <h1>
            <span onClick={() => navigate(-1)}>
              <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
            </span>
            <i>{data.name}</i>
          </h1>
          <hr />
          <div className="duob">
            <div className="linkpanel">
              <span onClick={() => share()}>Поделиться</span>
            </div>
            <span className="mini">Артикул: {data.id}</span>
          </div>
          <div className="duo">
            <ProdImgBar id={id} banner={data.img} />
            <div className="dop">
              <>
                <div className="moneycart">
                  {data.stokpercent === null ? (
                    <>
                      <p className="money">{data.money} ₽</p>
                    </>
                  ) : (
                    <>
                      <div className="moneybarw">
                        <div className="sto">
                          <span className="money">{data.oldmoney} ₽</span>
                          <span className="stokpercent">
                            {data.stokpercent}%
                          </span>
                        </div>
                        <span className="mini">
                          Старая цена:{" "}
                          <span className="money shirk">{data.money} ₽</span>
                        </span>
                      </div>
                    </>
                  )}
                  {data.stokpercent !== null ? (
                    <>
                      <button
                        className="outline"
                        onClick={() => StockOpen(data.stok)}
                      >
                        Подробнее об акции
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                  {localStorage.getItem("token") === null ? (
                    <>
                      <div className="noauth">Необходимо авторизироваться</div>
                    </>
                  ) : (
                    <>
                      {basketadd ? (
                        <button disabled>
                          <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                        </button>
                      ) : (
                        <button onClick={() => FromBasket()}>В корзину</button>
                      )}
                      <p onClick={() => ComplaintProdo()} className="mini">Пожаловаться</p>
                    </>
                  )}
                </div>
                {localStorage.getItem("token") === null ? (
                  <>
                    <button disabled>Чтобы купить товар, нужно авторизироваться</button>
                  </>
                ) : (<>
                  <button onClick={() => GoToPay(data.id, null, data.provider_id, data.money, data.oldmoney)}>Купить в один клик</button>
                </>)}

                <div className="postavprofile">
                  <p className="mini">Связаться с поставщиком</p>
                  <p>{data.provider_email}</p>
                  <p>{data.provider_phone}</p>
                  <p>
                    {data.provider_name} {data.provider_firstname}
                  </p>
                  <p className="mini">Адрес отправки</p>
                  <p>{data.provider_address}</p>
                </div>
              </>
            </div>
          </div>
          <h4>Полное название</h4>
          <p>{data.name}</p>
          <h4>Описание</h4>
          <pre>{data.description}</pre>
        </>
      )}
    </>
  );
};

export default ProductView;
