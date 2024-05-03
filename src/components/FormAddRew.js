import { useState } from 'react';
import serverUrl from "../config";

import '../styles/footer.css';
import { Link } from 'react-router-dom';

const FormAddRew = ({ produ }) => {
    const [text, setReview] = useState('');

    const reviewHandler = (event) => {
        setReview(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        SigninRequest();
      };
    
      function SigninRequest() {
        const params = new URLSearchParams();
        params.append('id', produ);
        params.append('text', text);
        params.append('me', localStorage.getItem("token"));
        fetch(`//${serverUrl}/api/review/add.php?${params.toString()}`)
          .then(response => response.json())
          .then(data => {
            if (data.status) {
              alert("Отзыв добавлен");
              setReview("");
              window.scrollTo(0, 0);
            } else {
              alert("Что-то пошло не так");
            }
          })
          .catch(error => {
            alert(`501 ошибка: ${error.message}`);
            console.error(error);
          });
      }
    
    return (
        <>
          <div>
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
                        <textarea type="text" value={text} onChange={reviewHandler} ></textarea>
                        <p className='mini'>Перед отпраавкой задумйтесь - ваш отзыв увидят все</p>
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