import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../../config";
import ModalAlert from "../../../components/ModalAlert";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import NoAuthPage from "../../../pages/NoAuthPage";

export default function AdminComplaintsPage() {
  document.title = "Панель администратора | Жалобы";
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
        params.append("me", localStorage.getItem('token'));
        const responses = await fetch(`//${serverUrl}/api/сomplaints/all.php?${params.toString()}`);
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


  const open = (id) => {
    navigate(`/product?id=${id}`);
  }

  const useropen = (id) => {
    navigate(`/profile/admin/user/edit?id=${id}`);
  }

  const goodjop = async (uid) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("id", uid);
      params.append("me", localStorage.getItem('token'));
      const responses = await fetch(`//${serverUrl}/api/сomplaints/statusok.php?${params.toString()}`);
      const jsonTrans = await responses.json();
      if (jsonTrans.status) {
        showModalWithText("Отличная работа!");
      }
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setLoading(false);
    }
  }


  const deleted = async (uid) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("id", uid);
      params.append("me", localStorage.getItem('token'));
      const responses = await fetch(`//${serverUrl}/api/сomplaints/delete.php?${params.toString()}`);
      const jsonTrans = await responses.json();
      if (jsonTrans.status) {
        showModalWithText("Отличная работа!");
        setData((prevData) => prevData.filter((item) => item.id !== uid));
      }
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setLoading(false);
    }
  }

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
        </div>
        <div className="page">
          <h3>{document.title}</h3>
          <p>Тут показываются жалобы пользователей на товары или же отзывы</p>
          <p>Вы можете и сами контролировать товары, перейдя в <Link to="/profile/admin/prodo">контроль товаров</Link></p>
          <p className="mini"><i>"Будье жесткими, как горы, но справедливыми, как солнце"</i> - Нельсон Мандела</p>
          <div className="stoklist">
            <>
              {data.length < 1 ? (
                <>
                  <div className="noauth">Жалобы не поступали</div>
                </>
              ) : (
                <>
                  {data.map((item) => (
                    <div
                      className=""
                      key={item.id}
                    >
                      <div>
                        <p className="mini">Статус</p>
                        {item.status === "0" ? (
                          <>
                            <p className="statcheck red">
                              <i className="fa fa-times" aria-hidden="true"></i> Действий не предпринято
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="statcheck">
                              <i className="fa fa-check" aria-hidden="true"></i> Действия были предприняты
                            </p>
                          </>
                        )}
                        <p className="mini">Тип обращения</p>
                        <p>{
                          item.type === "1" ? (<>
                            Жалоба на товар
                          </>) : (<>
                            Жалоба на отзыв</>)
                        }</p>
                        <p className="mini">Обращение</p>
                        <p>{item.complaint}</p>
                        <p className="mini">Дата обращения</p>
                        <p>{item.created}</p>
                        {
                          loading ? (
                            <div className="duo">
                              <button disabled className="o"><i className="fa fa-search" aria-hidden="true"></i>Проверка</button>
                              <button disabled ><i className="fa fa-check" aria-hidden="true"></i>Решено</button>
                              <button disabled className="red"> <i className="fa fa-times" aria-hidden="true"></i>Удалить</button>
                            </div>) : (
                            <div className="duo">
                              <button onClick={() => open(item.to_uid)} className="o"><i className="fa fa-search" aria-hidden="true"></i>Проверка</button>
                              <button onClick={() => goodjop(item.id)} ><i className="fa fa-check" aria-hidden="true"></i>Решено</button>
                              <button onClick={() => deleted(item.id)} className="red"> <i className="fa fa-times" aria-hidden="true"></i>Удалить</button>
                            </div>)
                        }
                        <p onClick={() => useropen(item.from_uid)} className="mini">Посмотреть данные отправителя</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          </div>
        </div>
      </main >
      <Footer />
    </>
  );
}
