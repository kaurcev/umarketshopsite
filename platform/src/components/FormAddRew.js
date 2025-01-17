import { useState } from "react";
import { serverUrl } from "../config";
import "../styles/FormAddRew.css";
import ModalAlert from "../components/ModalAlert";
import { useNavigate } from "react-router-dom";
import ReviewsBar from "./ReviewsBar";

const FormAddRew = ({ id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [text, setReview] = useState("");

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

  const reviewHandler = (event) => {
    setReview(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    SigninRequest();
  };

  function SigninRequest() {
    if (!text) return null;
    setLoading(true);
    const params = new URLSearchParams();
    params.append("id", id);
    params.append("text", text);
    params.append("me", localStorage.getItem("token"));
    fetch(`//${serverUrl}/review/add?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          showModalWithText("Отзыв добавлен. Скоро его увидят все!");
          setReview("");
        } else {
          showModalWithText("Что-то пошло не так");
        }
      })
      .catch((error) => {
        showModalWithText(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  if (!id) return null;
  return (
    <>
      <ModalAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        text={modalText}
      />
      <div className="FormAddRew">
        {localStorage.getItem("token") === null ? (
          <>
            <div className="noauth" onClick={() => navigate("/auth")}>
              Необходимо авторизироваться
            </div>
          </>
        ) : (
          <>
            <form onSubmit={submitHandler} className="addtew">
              <p className="mini">Напишите ваш отзыв</p>
              <textarea
                placeholder="Расскажите о товаре, каков он оказался для вас?"
                type="text"
                value={text}
                onChange={reviewHandler}
              ></textarea>
              <p className="mini">
                Перед отправкой задумйтесь - ваш отзыв увидят все
              </p>
              {loading ? (
                <button disabled>
                  <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                </button>
              ) : (
                <button>Отправить</button>
              )}
            </form>
          </>
        )}
      </div>
      {loading ? (<><p className="noauth">Загрузка</p></>) : (<ReviewsBar id={id} />)}

    </>
  );
};

export default FormAddRew;