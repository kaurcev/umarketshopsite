import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import serverUrl from "../config";

export default function Signup() {
  document.title = "Автооризация";
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');

  const surnameHandler = (event) => {
    setSurname(event.target.value);
  };

  const nameHandler = (event) => {
    setName(event.target.value);
  };
  
  const firstnameHandler = (event) => {
    setFirstname(event.target.value);
  };
  
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };


  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    SigninRequest();
  };

  function SigninRequest() {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('surname', surname);
    params.append('name', name);
    params.append('firstname', firstname);
    params.append('email', email);
    fetch(`//${serverUrl}/api/user/signup.php?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          alert("Теперь вы можете авторизироваться!");
          navigate('/auth');
        } else {
          alert("Данный логин занят");
        }
      })
      .catch(error => {
        alert(`501 ошибка: ${error.message}`);
        console.error(error);
      });
  }

  return (
    <>
    <main className="centered">
      {localStorage.getItem('token') ? (
        <>
          <p>Вы уже авторизированы</p>
          <p><Link className='bt' to="/">Перейти</Link></p>
        </>
      ) : (
        <>
           <form className='signin' onSubmit={submitHandler}>
            <div className='duo'>
            <div>
              <h2>юМаркет шоп</h2>
              <p>Фамилия</p>
                <input type="text" maxLength="100" value={surname} onChange={surnameHandler} />
                <p>Имя</p>
                <input type="text" maxLength="100" value={name} onChange={nameHandler} />
                <p>Отчество</p>
                <input type="text" maxLength="100" value={firstname} onChange={firstnameHandler} />
              </div>
              <div>
              <h2>Регистрация</h2>
              <p>Ваш email</p>
                <input type="email"  maxLength="100" value={email} onChange={emailHandler} />
                <p>Логин</p>
                <input type="text"  maxLength="100" value={username} onChange={usernameHandler} />
                <p>Пароль</p>
                <input type="password" maxLength="100"  value={password} onChange={passwordHandler} />
                <p>Повторите пароль</p>
                <input type="password" maxLength="100" value={password} onChange={passwordHandler} />
              </div>
            </div>
              <div>
                <p><button>Зарегистрироваться</button></p>
                <p className='center'><Link to='/auth'>Уже есть аккаунт</Link></p>
              </div>
            </form>
        </>
      )}
    </main>
    <Footer />
    </>

  );
}