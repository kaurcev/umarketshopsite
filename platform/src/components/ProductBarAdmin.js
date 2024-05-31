import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../config";
import "../styles/header.css";
import ProductBarloader from "./ProductBarloader";
import ModalAlert from "../components/ModalAlert";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function ProductBarAdmin() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchtext, setSearchtext] = useState("");
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

  const searchstart = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("search", searchtext);
      const responses = await fetch(
        `//${serverUrl}/product/search?${params.toString()}`
      );
      const jsonTrans = await responses.json();
      setData(jsonTrans.data);
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setLoading(false);
    }
  }

  const searchHandler = (event) => {
    setSearchtext(event.target.value);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const responses = await fetch(`//${serverUrl}/products`);
      const jsonTrans = await responses.json();
      setData(jsonTrans.data);
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  const openprodo = async (id) => {
    navigate(`/product?id=${id}`);
  };
  const openprovider = async (id) => {
    navigate(`/profile/admin/provider/edit?id=${id}`);
  };


  return (
    <>
      <ModalAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        text={modalText}
      />
      <h3>Товары в продаже</h3>
      <p className="mini">Вы можете найти товар по ключевым словам</p>
      <form className="duo" onSubmit={searchstart}>
        <input required placeholder="Ключевое слово" onChange={searchHandler} type="text" />
        {loading ? (
          <button disabled>
            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          </button>
        ) : (
          <button>Поиск</button>
        )}
        <button onClick={() => fetchData()} className="red" type="reset">
          Сбросить изменения
        </button>
      </form>
      <div className="productbar">
        {loading ? (
          <>
            <ProductBarloader />
          </>
        ) : (
          data.map((item) => (
            <div className="productcart" key={item.id}>
              <LazyLoadImage effect="blur" src={`//${serverUrl}/img/${item.img}`} alt={item.name} />
              {item.stokpercent === null ? (
                <>
                  <p className="money">{item.money}₽</p>
                </>
              ) : (
                <>
                  <div className="moneybar">
                    <p className="money">{item.oldmoney}₽</p>
                    <span className="stokpercent">{item.stokpercent}%</span>
                  </div>
                </>
              )}
              <h5>{item.name}</h5>
              <p className="desc mini">{item.description}</p>
              <button className="o" onClick={() => openprodo(item.id)}>
                Открыть товар
              </button>
              <button onClick={() => openprovider(item.provider_id)}>Профиль поставщика</button>
            </div>
          ))
        )}
        <div className="productcart fill"></div>
      </div>
    </>
  );
}