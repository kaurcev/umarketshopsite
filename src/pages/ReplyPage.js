import React, { useEffect, useState } from "react";
import { serverUrl } from "../config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalAlert from "../components/ModalAlert";
import ProductMiniPanel from "../components/ProductMiniPanel";

export default function ReplyPage() {
  document.title = "Отзыв..";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const replyid = searchParams.get("id");

  // Для отображения модального окна
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [message, setMessage] = useState("");

  const showModalWithText = (text) => {
    setModalText(text); // Устанавливаем текст для модального окна
    setShowModal(true); // Показываем модальное окно
    setTimeout(() => {
      setShowModal(false); // Автоматически скрываем модальное окно через 3 секунды
    }, 1500);
  };

  async function revRequest() {
    if (!message) return null;
    const params = new URLSearchParams();
    params.append("id", replyid);
    params.append("text", message);
    params.append("me", localStorage.getItem("token"));
    fetch(`//${serverUrl}/review/provider/add?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          showModalWithText("Отзыв добавлен. Вы можете его исправить");
          setMessage("");
          window.scrollTo(0, 0);
        } else {
          showModalWithText("Что-то пошло не так");
        }
      })
      .catch((error) => {
        showModalWithText(error.message);
      });
  }
  const reviewHandler = (event) => {
    setMessage(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    revRequest();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("id", replyid);
        const responses = await fetch(
          `//${serverUrl}/review/provider?${params.toString()}`
        );
        const jsonTrans = await responses.json();
        if (jsonTrans.status) {
          document.title = jsonTrans.data.name;
          setData(jsonTrans.data);
        } else {
          navigate("/400");
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
      <Header />
      <ModalAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        text={modalText}
      />
      <main className="profile pay">
        <div className="w250">
          <Link className="bt" to="/profile/postav/replys">
            Вернуться назад
          </Link>
        </div>
        <div className="page replypage">
          {loading ? (
            <>Идет загрузка</>
          ) : (
            <div className="duo">
              <div className="messagebar">
                <div className="mleft">
                  <div className="replymessage">
                    <h4>{data.username}</h4>
                    <pre>{data.message}</pre>
                    <p className="mini">{data.date}</p>
                  </div>
                </div>
                {data.reply ? (
                  <>
                    <div className="mright">
                      <div className="replymessagepostav">
                        <pre>{data.reply}</pre>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3>Ваш ответ</h3>
                    <form className="formgap" onSubmit={submitHandler}>
                      <label>
                        Напишите свой ответ на отзыв пользователя, но обратите
                        внимание, что ваш ответ будет виден всем
                      </label>
                      <textarea
                        type="text"
                        value={message}
                        onChange={reviewHandler}
                      ></textarea>
                      <p className="mini">
                        После отправки ответа на отзыв, вы не сможете его
                        отредактировать
                      </p>
                      <div className="duo">
                        <button>Отправить</button>
                        <button className="red">Сбросить изменения</button>
                      </div>
                    </form>
                  </>
                )}
              </div>
              <ProductMiniPanel id={data.product} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
