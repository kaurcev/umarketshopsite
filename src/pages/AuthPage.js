import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import serverUrl from "../config";
import Footer from '../components/Footer';

export default function AuthPage() {
  document.title = "Авторизация";
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    loginRequest();
  };
  function loginRequest() {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    fetch(`//${serverUrl}/api/user/login.php?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          console.log(data.data.token);
          localStorage.setItem('token', data.data.token);
          navigate('/');
        }else{
          alert("Прверьте правильность введеных данных");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

    return (
      <>
      <main className='centered'>
        {localStorage.getItem('token') ? (
          <>
            <p>Вы уже авторизированы</p>
            <p><Link to="/profile">Перейти</Link></p>
          </>
        ) : (
          <>
            <form className='auth' onSubmit={submitHandler}>
              <div className='info'>
              <h2>юМаркет шоп</h2>
              <ul>
                <li>Удобство</li>
                <li>Практичность</li>
                <li>То, что Вам необходимо</li>
              </ul>
              </div>
              <div className='back'>
                <h2>Авторизация</h2>
                <p>Логин</p>
                <input maxLength="30" type="text" value={username} onChange={usernameHandler} />
                <p>Пароль</p>
                <input maxLength="30" type="password" value={password} onChange={passwordHandler} />
                <p><button>Войти</button></p>
                <p className='center'><Link to='/signup'>Ещё нет аккаунта</Link></p>
              </div>
            </form>
          </>
        )}
        </main>
        <Footer />
      </>
    )
  }
  