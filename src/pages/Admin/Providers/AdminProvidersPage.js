import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../config";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import ModalAlert from "../../../components/ModalAlert";

export default function AdminProvidersPage() {
  document.title = "Панель администратора | Поставщики";
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
      params.append("s", searchtext);
      params.append("me", localStorage.getItem("token"));
      const responses = await fetch(
        `//${serverUrl}/api/adminpanel/providers/search.php?${params.toString()}`
      );
      const jsonTrans = await responses.json();
      setData(jsonTrans.data);
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setLoading(false);
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("me", localStorage.getItem("token"));
      const responses = await fetch(
        `//${serverUrl}/api/adminpanel/providers/all.php?${params.toString()}`
      );
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

  const searchHandler = (event) => {
    setSearchtext(event.target.value);
  };
  return (
    <>
      <Header />
      <ModalAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        text={modalText}
      />
      <main className="profile pay">
        <div className="w250">
          <Link className="bt" to="/profile/admin">
            Вернуться назад
          </Link>
          <Link className="bt" to="/profile/admin/provider/add">
           Добавить поставщика
          </Link>
        </div>
        <div className="page">
          <h3>ПОСТАВЩИКИ</h3>
          <form className="signup" onSubmit={searchstart}> 
          <p className="mini">Найдите организацию по ключевым словам</p>
            <input required placeholder="Наименование организации или ключевые слова" onChange={searchHandler} type="text" />
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
          {loading ? (
            <>
              <div className="cart load"></div>
              <div className="cart load"></div>
              <div className="cart load"></div>
              <div className="cart load"></div>
            </>
          ) : (
            <>
              {data.map((item) => (
                <div key={item.id} className="cart reply">
                  <p className="mini">В числе поставщиков с {item.datecreate}</p>
                  <h4>{item.name}</h4>
                  <p className="mini">Описание</p>
                  <p>{item.description}</p>
                  <p className="mini">Email</p>
                  <p>{item.email}</p>
                  <p className="mini">Телефон</p>
                  <p>{item.phone}</p>
                  <p></p>
                  <div className="duo">
                  <button
                    onClick={() =>
                      navigate(`/profile/admin/provider/edit?id=${item.id}`)
                    }
                  >
                    Редактировать поставщика
                  </button>
                  <button
                  className="o"
                    onClick={() =>
                      navigate(`/profile/admin/user/edit?id=${item.manager}`)
                    }
                  >
                    Редактировать менеджера
                  </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
