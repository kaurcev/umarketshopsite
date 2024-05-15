import { useState } from 'react';
import { serverUrl } from "../config";
import '../styles/FormAddRew.css';
import { Link } from 'react-router-dom';
import ModalAlert from '../components/ModalAlert';

const FormAddRew = ({ id }) => {
    const [text, setReview] = useState('');

    // Для отображения модального окна
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');

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
        if(!text) return null;
        const params = new URLSearchParams();
        params.append('id', id);
        params.append('text', text);
        params.append('me', localStorage.getItem("token"));
        fetch(`//${serverUrl}/api/review/add.php?${params.toString()}`)
          .then(response => response.json())
          .then(data => {
            if (data.status) {
              showModalWithText("Отзыв добавлен");
              setReview("");
              window.scrollTo(0, 0);
            } else {
              showModalWithText("Что-то пошло не так");
            }
          })
          .catch(error => {
            showModalWithText(error.message);
          });
      }
    if (!id) return null;
    return (
        <>
         <ModalAlert show={showModal} onClose={() => setShowModal(false)} text={modalText} />
          <div className='FormAddRew'>
          {
            localStorage.getItem('token') === null ? (
            <>
            <p className='noauth'>
            <Link to="/auth" >
                Необходимо авторизироваться
            </Link>
            </p>
            </>) : (
                <>
                    <form onSubmit={submitHandler} className='addtew'>
                        <p className='mini'>Напишите ваш отзыв</p>
                        <textarea placeholder='Расскажите о товаре, каков он оказался для вас?' type="text" value={text} onChange={reviewHandler} ></textarea>
                        <p className='mini'>Перед отправкой задумйтесь - ваш отзыв увидят все</p>
                        <button>Отправить</button>
                    </form>
                </>
            )
            }
          </div>
          </>
    );
}

export default FormAddRew;