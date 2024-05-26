import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../config";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import ModalAlert from "../../../components/ModalAlert";

export default function AdminUserAddPage() {
  document.title = "Редактирование пользователя";
  const navigate = useNavigate();
  const [checkuser, setCheckuser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("1");

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
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей


  const checkusername = async () => {
    const params = new URLSearchParams();
    params.append("u", username);
    params.append("me", localStorage.getItem('token'));
    try {
      const response = await fetch(
        `//${serverUrl}/api/adminpanel/checkusername.php?${params.toString()}`
      );
      const jsonTrans = await response.json();
      if (jsonTrans.status) {
        setCheckuser(true);
      } else {
        setCheckuser(false);
      }
    } catch (error) {
      showModalWithText(error.message);
    }
  };

  const SigninRequest = async () => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    params.append("surname", surname);
    params.append("name", name);
    params.append("firstname", firstname);
    params.append("email", email);
    params.append("r", role);
    params.append("me", localStorage.getItem('token'));
    try {
      setLoading(true);
      const responses = await fetch(
        `//${serverUrl}/api/adminpanel/useradd.php?${params.toString()}`
      );
      const jsonTrans = await responses.json();
      if (jsonTrans.status) {
        showModalWithText(jsonTrans.message);
        navigate('/profile/admin/users')
      } else {
        showModalWithText(jsonTrans.message);
      }
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const roleHandler = (event) => {
    setRole(event.target.value);
  };



  const submitHandler = (event) => {
    event.preventDefault();
    checkusername();
    SigninRequest();
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
          <Link className="bt" onClick={() => navigate(-1)}>
            Вернуться назад
          </Link>
        </div>
        <div className="page">
          <div>
            <h1>Добавление пользователя</h1>
            <form onSubmit={submitHandler}>
              <p className="mini">Фамилия<span className="red">*</span></p>
              <input
                type="text"
                placeholder="Фамилия пользователя"
                maxLength="100"
                value={surname}
                required
                onChange={surnameHandler}
              />
              <p className="mini">Имя<span className="red">*</span></p>
              <input
                type="text"
                placeholder="Имя пользователя"
                maxLength="100"
                value={name}
                required
                onChange={nameHandler}
              />
              <p className="mini">
                Отчество <span className="mini">(При наличии)</span>
              </p>
              <input
                type="text"
                placeholder="Отчество пользователя"
                maxLength="100"
                value={firstname}
                onChange={firstnameHandler}
              />
              <p className="mini">Email<span className="red">*</span></p>
              <input
                type="email"
                placeholder="Email пользователя"
                maxLength="100"
                value={email}
                required
                onChange={emailHandler}
              />
              <p className="mini">Логин<span className="red">*</span></p>
              <input
                type="text"
                placeholder="Логин пользователя"
                maxLength="100"
                value={username}
                required
                onChange={usernameHandler}
              />
              {checkuser ? (
                <p className="mini"><span className="red">Этот логин занят!</span></p>) : null}
              <p className="mini">Пароль<span className="red">*</span></p>
              <input
                type="password"
                placeholder="Пароль пользователя"
                maxLength="100"
                value={password}
                required
                onChange={passwordHandler}
              />
              <p className="mini">Повторите пароль<span className="red">*</span></p>
              <input
                type="password"
                placeholder="Повторите пароль"
                maxLength="100"
                value={password}
                required
                onChange={passwordHandler}
              />
              <p className="mini">Роль польователя</p>
              <select value={role} onChange={roleHandler}>
                <option value="1">Пользователь</option>
                <option value="2">Поставщик</option>
                <option value="3">Администратор</option>
                <option value="4">Тестировщик</option>
              </select>
              {role === "2" ? (<>
                <p className="mini">После создания профиля поставщика, создайте организацию и привяжите пользователя как менеджера</p>
              </>) : null}
              {loading ? (
                <button disabled>
                  <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                </button>
              ) : (
                <button>Добавить</button>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
