import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../config";
import "../styles/header.css";
import walletimg from "../img/wallet.png";
import yoomoney from "../img/iomoney.svg";
import ModalAlert from "../components/ModalAlert";

export default function WalletCart() {
  document.title = "Ваш кошелёк";
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
        const params = new URLSearchParams();
        params.append("me", localStorage.getItem("token"));
        const response = await fetch(
          `//${serverUrl}/getinformation?${params.toString()}`
        );
        const jsonData = await response.json();
        setData(jsonData.data);
        if (!jsonData.status) {
          navigate("/logout");
        }
      } catch (error) {
        showModalWithText(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  return (
    <>
      <ModalAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        text={modalText}
      />
      <h4>ВАШ КОШЕЛЁК</h4>
      <p className="mini">Ваши средства будут храниться в юМаркет Шоп</p>
      {loading ? (
        <>
          <div className="cartpanel load"></div>
          <h4>ПОПОЛНЕНИЕ</h4>
          <div className="cartpanel load"></div>
        </>
      ) : (
        <>
          <div className="cartpanel">
            <h2>{data.wallet}₽</h2>
            <div className="bank">
              <span className="mini">Интеграция с </span>{" "}
              <img src={yoomoney} alt="" />
            </div>
          </div>
          <h4>ПОПОЛНЕНИЕ</h4>
          <div className="duo">
            <form
              className="pay"
              method="POST"
              action="https://yoomoney.ru/quickpay/confirm"
            >
              <input type="hidden" name="receiver" value="4100110853907883" />
              <input type="hidden" name="label" defaultValue={data.username} />
              <input type="hidden" name="quickpay-form" value="button" />
              <p className="mini">Сумма поплнения (От 500₽)</p>
              <input
                type="number"
                name="sum"
                required
                min="500"
                defaultValue="500"
                data-type="number"
              />
              <p className="mini">
                ЮMoney и юМаркет не берут коммисию. Её может взять банк
              </p>
              <input
                type="hidden"
                name="successURL"
                value="https://umarketshop.site/pay/success"
              />
              <h4>Способ пополнения</h4>
              <div className="duo">
                <label>
                  <input type="radio" name="paymentType" value="PC" />
                  ЮMoney
                </label>
                <label>
                  <input type="radio" name="paymentType" value="AC" />
                  Банковская карта
                </label>
              </div>
              <button>Пополнить</button>
              <p className="mini">
                Нажимая кнопку "Пополнить" вы принимаете{" "}
                <Link to="/use-terms">правила использования</Link>
              </p>
            </form>
            <img src={walletimg} alt="Кошелёк" />
          </div>
        </>
      )}
    </>
  );
}
