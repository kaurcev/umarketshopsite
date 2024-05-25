import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../config";
import profileimg from "../../img/profile.png";
import Header from "../../components/Header";
import PostMap from "../../components/PostMap";
import Footer from "../../components/Footer";
import ModalAlert from "../../components/ModalAlert";

export default function ProfileEditPage() {
  document.title = "Редактирование профиля";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [address, setAddress] = useState("");

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

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const phoneHandler = (event) => {
    setPhone(event.target.value);
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

  const submitHandler = (event) => {
    event.preventDefault();
    EditdataloadRequest();
  };
  function EditdataloadRequest() {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("phone", phone);
    params.append("surname", surname);
    params.append("name", name);
    params.append("firstname", firstname);
    params.append("address", address);
    params.append("me", localStorage.getItem("token"));
    fetch(`//${serverUrl}/profile/update?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          showModalWithText(data.message);
        } else {
          showModalWithText(data.message);
        }
      })
      .catch((error) => {
        showModalWithText(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (localStorage.getItem("token") == null) {
          navigate("/auth");
        }
        const params = new URLSearchParams();
        params.append("me", localStorage.getItem("token"));
        const response = await fetch(
          `//${serverUrl}/getinformation?${params.toString()}`
        );
        const jsonData = await response.json();
        setData(jsonData.data);
        setEmail(jsonData.data.email);
        setPhone(jsonData.data.phone);
        setSurname(jsonData.data.surname);
        setName(jsonData.data.name);
        setFirstname(jsonData.data.firstname);
        setAddress(jsonData.data.address);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  const handleButtonClick = (index, address) => {
    setAddress(`${index} ${address}`);
  };

  return (
    <>
      <ModalAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        text={modalText}
      />
      <Header />
      <main className="profile">
        <div className="w250">
          <Link className="bt" to="/profile">
            Вернуться назад
          </Link>
        </div>
        <div className="page">
          <>
            <h4>РЕДАКТИРОВАНИЕ ПРОФИЛЯ</h4>
            <div className="duo">
              <form onSubmit={submitHandler}>
                <p className="mini">
                  Почта<span className="red">*</span>
                </p>
                <input
                  placeholder="username@mail.com"
                  required
                  type="email"
                  name="email"
                  maxLength="50"
                  defaultValue={data.email}
                  onChange={emailHandler}
                />
                <p className="mini">
                  Номер телефона<span className="red">*</span>
                </p>
                <input
                  placeholder="+7-(000)-000-00-00"
                  required
                  type="tel"
                  name="phone"
                  maxLength="30"
                  defaultValue={data.phone}
                  onChange={phoneHandler}
                />
                <p className="mini">
                  Ваше имя<span className="red">*</span>
                </p>
                <input
                  placeholder="Имя"
                  required
                  type="text"
                  name="name"
                  maxLength="50"
                  defaultValue={data.name}
                  onChange={nameHandler}
                />
                <p className="mini">
                  Ваша фамилия<span className="red">*</span>
                </p>
                <input
                  placeholder="Фамилия"
                  required
                  type="text"
                  maxLength="50"
                  name="surname"
                  defaultValue={data.surname}
                  onChange={surnameHandler}
                />
                <p className="mini">Ваше отчество</p>
                <input
                  placeholder="Отчество при наличии"
                  type="text"
                  maxLength="50"
                  name="firstname"
                  defaultValue={data.firstname}
                  onChange={firstnameHandler}
                />
                {loading ? (
                  <button disabled>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                  </button>
                ) : (
                  <button>Сохранить данные</button>
                )}
                <button className="red" type="reset">
                  Отменить изменения
                </button>
                <p className="mini w">
                  Не забывайте про нашу{" "}
                  <Link to="/privacy">Политику конфиденциальности</Link> и{" "}
                  <Link to="/use-terms">правилами использования</Link>. В этих
                  документах описано, как и почему мы используем эти данные
                </p>
              </form>
              <img src={profileimg} alt="Профиль" />
            </div>
            <h4>МЕСТО ДОСТАВКИ</h4>
            <p>
              Вы указываете почтовое отделение для того, чтобы поставщик
              отправил Вам ваш товар.
            </p>
            <PostMap onButtonClick={handleButtonClick} />
          </>
        </div>
      </main>
      <Footer />
    </>
  );
}