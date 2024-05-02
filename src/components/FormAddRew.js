import React from 'react';

import '../styles/footer.css';
import { Link } from 'react-router-dom';

export default function FormAddRew() {

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
                    <form className='addtew'>
                        <p className='mini'>Напишите ваш отзыв</p>
                        <textarea></textarea>
                        <p className='mini'>Перед отпраавкой задумйтесь - ваш отзыв увидят все</p>
                        <div className='duo'>
                        <button>Отправить</button>
                        <button className='red'>Отменить изменения</button>
                        </div>
                    </form>
                </>
            )
            }
          </div>
          </>
    );
}