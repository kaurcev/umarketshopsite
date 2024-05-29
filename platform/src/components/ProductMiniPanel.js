import React, { useState, useEffect } from "react";
import { serverUrl } from "../config";
import ModalAlert from "./ModalAlert";
import "../styles/ProductView.css";

const ProductMiniPanel = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
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
        document.title = JsonData.data.name;
      } catch (error) {
        showModalWithText(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  if (!id) return null;
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <ModalAlert
            show={showModal}
            onClose={() => setShowModal(false)}
            text={modalText}
          />
          <div className="ProductMiniPanel">
            <h4>
              <i>{data.name}</i>
            </h4>
            <div
              className="imgback"
              style={{
                backgroundImage: `url("${`//${serverUrl}/img/${data.img}`}")`,
              }}
            >
              <img
                className="preview"
                src={`//${serverUrl}/img/${data.img}`}
                alt={data.img}
              />
            </div>
            <h4>Полное название</h4>
            <p>{data.name}</p>
            <h4>Описание</h4>
            <pre>{data.description}</pre>
          </div>
        </>
      )}
    </>
  );
};

export default ProductMiniPanel;
