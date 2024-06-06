import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../config";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import ModalAlert from "../../../components/ModalAlert";
import NoAuthPage from "../../../pages/NoAuthPage";

export default function ReplysPage() {
  document.title = "Панель поставщика | Отзывы";
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
        const responses = await fetch(
          `//${serverUrl}/review/provider/all?${params.toString()}`
        );
        const jsonTrans = await responses.json();
        if (jsonTrans.status) {
          document.title = jsonTrans.data.name;
          setData(jsonTrans.data);
        } else {
          showModalWithText("У вас еще нет товаров, чтобы им были отзывы");
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
  if (!localStorage.getItem('token')) return (<><NoAuthPage /></>);
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
          <Link className="bt" onClick={() => navigate(-1)}>
            Вернуться назад
          </Link>
        </div>
        <div className="page">
          <h3>ОТЗЫВЫ НА ТОВАРЫ</h3>
          <p className="mini">Последние отзывы на ваши товары</p>
          {loading ? (
            <>
              <div className="noauth">Идёт загрузка</div>
            </>
          ) : (
            <>
              {data.map((item) => (
                <div key={item.id} className="cart reply">
                  <h4>{item.username}</h4>
                  <p>{item.message}</p>
                  {item.reply === "" ? (
                    <>
                      <p className="statcheck red">
                        <i class="fa fa-times" aria-hidden="true"></i> Требует
                        ответа
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="statcheck">
                        <i class="fa fa-check" aria-hidden="true"></i> Ответ дан
                      </p>
                    </>
                  )}
                  <button
                    onClick={() =>
                      navigate(`/profile/postav/reply?id=${item.id}`)
                    }
                  >
                    Детали отзыва
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
