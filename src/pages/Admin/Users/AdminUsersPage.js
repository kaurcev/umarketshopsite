import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../config";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import ModalAlert from "../../../components/ModalAlert";

export default function AdminUsersPage() {
  document.title = "Панель администратора | Пользователи";
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
        `//${serverUrl}/api/adminpanel/userallsearch.php?${params.toString()}`
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
        `//${serverUrl}/api/adminpanel/userall.php?${params.toString()}`
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
          <Link className="bt" to="/profile/admin/user/add">
           Добавить пользователя
          </Link>
        </div>
        <div className="page">
          <h3>ПОЛЬЗОВАТЕЛИ</h3>
          <p className="mini">Найдите пользователя, введя его юзернейм</p>
          <form className="duo" onSubmit={searchstart}> 
          <input required placeholder="Юзернейм пользователя" onChange={searchHandler} type="text" />
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
          <p className="mini">Тут все пользователи системы</p>
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
                  <h4>{item.username}</h4>
                  {item.roleid === "1" ? ( <><p className="mini"><i className="fa fa-user" aria-hidden="true"></i> {item.role}</p></>) : null}
                  {item.roleid === "2" ? ( <><p className="mini"><i className="fa fa-cubes" aria-hidden="true"></i> {item.role}</p></>) : null}
                  {item.roleid === "3" ? ( <><p className="mini"><i className="fa fa-star" aria-hidden="true"></i> {item.role}</p></>) : null}
                  {item.roleid === "4" ? ( <><p className="mini"><i className="fa fa-code" aria-hidden="true"></i> {item.role}</p></>) : null}
                  <p className="mini">В числе участников с {item.created} </p>
                  <p>{item.surname} {item.name} {item.firstname}</p>
                  <p className="mini"><i className="fa fa-map-pin" aria-hidden="true"></i> {item.address}</p>
                  <p></p>
                  <button
                    onClick={() =>
                      navigate(`/profile/admin/user/edit?id=${item.id}`)
                    }
                  >
                    Редактировать
                  </button>
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
