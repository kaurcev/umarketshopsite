import React, { useEffect, useState } from "react";
import { serverUrl } from "../config";
import { useLocation, useNavigate } from "react-router-dom";
import ModalAlert from "./ModalAlert";

export default function FormEditStoks() {
  const navigate = useNavigate();
  document.title = "Добавление акции";
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateend, setDateend] = useState("");
  const [percent, setPercent] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const stockid = searchParams.get("id");

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
        params.append("id", stockid);
        params.append("me", localStorage.getItem("token"));
        const response = await fetch(
          `//${serverUrl}/provider/stok?${params.toString()}`
        );
        const jsonData = await response.json();
        setName(jsonData.data.name);
        setDescription(jsonData.data.description);
        setDateend(jsonData.data.dateend);
        setPercent(jsonData.data.percent);
      } catch (error) {
        showModalWithText(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const descHandler = (event) => {
    setDescription(event.target.value);
  };

  const dateendHandler = (event) => {
    setDateend(event.target.value);
  };

  const percentHandler = (event) => {
    setPercent(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    updateStock();
  };

  async function updateStock() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (!name) {
        showModalWithText("Вы не указали название акции");
        return null;
      }
      if (!description) {
        showModalWithText("Вы не указали описание акции");
        return null;
      }
      if (!dateend) {
        showModalWithText("Укажите дату окончания акции");
        return null;
      }
      if (!percent) {
        showModalWithText("Укажите процент скидки на товар");
        return null;
      }
      params.append("id", stockid);
      params.append("name", name);
      params.append("descr", description);
      params.append("dateend", dateend);
      params.append("percent", percent);
      params.append("me", localStorage.getItem("token"));
      const response = await fetch(
        `//${serverUrl}/provider/updatestok?${params.toString()}`
      );
      const jsonData = await response.json();
      if (jsonData.status) {
        showModalWithText("Обновлено");
        navigate(-1);
      }
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ModalAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        text={modalText}
      />
      <form onSubmit={submitHandler}>
        <p className="mini">Название акции</p>
        <input
          maxLength="50"
          placeholder="Название акции"
          value={name}
          type="text"
          onChange={nameHandler}
        />
        <p className="mini">Процент скидки на товар</p>
        <input type="number" value={percent} placeholder="от 0 до 100" min="0" max="100" onChange={percentHandler} />
        <p className="mini">Описание акции</p>
        <textarea
          maxLength="5000"
          placeholder="Расскажите о акции"
          value={description}
          onChange={descHandler}
        />
        <p className="mini">Дата окончания акции</p>
        <input
          type="datetime-local"
          value={dateend}
          onChange={dateendHandler}
        />
        <p className="mini">
          Обратите внимание, что создавемая Вами акция будет отображаться у
          польззователей в главном меню!
        </p>
        {loading ? (
          <p>
            <button disabled>
              <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            </button>
          </p>
        ) : (
          <p>
            <button>Обновить</button>
          </p>
        )}
        <button className="red" type="reset">
          Сбросить изменения
        </button>
      </form>
    </>
  );
}
