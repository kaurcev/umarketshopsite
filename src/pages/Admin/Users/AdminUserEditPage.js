import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../config";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalAlert from "../../../components/ModalAlert";

export default function AdminProviderEditPage() {
  document.title = "Редактирование поставщика";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const userid = searchParams.get("id");

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("id", userid);
      params.append("me", localStorage.getItem('token'));
      const responses = await fetch(
        `//${serverUrl}/api/adminpanel/userone.php?${params.toString()}`
      );
      const jsonTrans = await responses.json();
      setData(jsonTrans.data);
      if(jsonTrans.status){
        setSurname(jsonTrans.data.surname);
        setName(jsonTrans.data.name);
        setFirstname(jsonTrans.data.firstname);
        setEmail(jsonTrans.data.email);
        setPhone(jsonTrans.data.phone)
      }
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

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

  const phoneHandler = (event) => {
    setPhone(event.target.value);
  };

  const deleteprofile = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("id", userid);
      params.append("me", localStorage.getItem('token'));
      const responses = await fetch(
        `//${serverUrl}/api/adminpanel/userdelete.php?${params.toString()}`
      );
      const jsonTrans = await responses.json();
      if(jsonTrans.status){
        navigate("/profile/admin/users")
      }
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setLoading(false);
    }
  }

  const updatedata = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("id", userid);
      params.append("surname", surname);
      params.append("name", name);
      params.append("firstname", firstname);
      params.append("email", email);
      params.append("phone", phone);
      params.append("me", localStorage.getItem('token'));
      const responses = await fetch(
        `//${serverUrl}/api/adminpanel/userupdate.php?${params.toString()}`
      );
      const jsonTrans = await responses.json();
      if(jsonTrans.status){
        navigate("/profile/admin/users")
      }
      showModalWithText(jsonTrans.message);
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setLoading(false);
    }
  }


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
          <Link className="bt" to="/profile/admin/users">
            Вернуться назад
          </Link>
        </div>
        <div className="page">
          {loading ? (
            <>
            <div className="load">
              
            </div>
            <div className="load">
              
              </div>
              <div className="load">
              
              </div>
              <div className="load">
              
              </div>
            </>
          ) : (
            <div>
                <h1>{data.username}</h1>
              <p>{data.created}</p>
              <form onSubmit={updatedata}>
                  <p className="mini">Фамилия<span className="red">*</span></p>
                  <input required maxLength="50" type="text" onChange={surnameHandler} value={surname} />
                  <p className="mini">Имя<span className="red">*</span></p>
                  <input required maxLength="50" type="text" onChange={nameHandler} value={name} />
                  <p className="mini">Отчество</p>
                  <input maxLength="50" type="text" onChange={firstnameHandler} value={firstname} />
                  <p className="mini">Электронная почта<span className="red">*</span></p>
                  <input required maxLength="100" type="email" onChange={emailHandler} value={email} />
                  <p className="mini">Номер телефона<span className="red">*</span></p>
                  <input required maxLength="30" type="tel" onChange={phoneHandler} value={phone} />
                  <p className="mini">Адрес доставки (Указывается исключительно пользователем)</p>
                  <p>{data.address}</p>
                  <p className="mini">Баланс (Пополняется только пользователем)</p>
                  <p>{data.wallet}</p>
                  {loading ? (
                  <button disabled>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                    </button>
                  ) : (
                    <button>Сохранить</button>
                  )}
                  <button onClick={() => deleteprofile()} className="red">Удалить профиль</button>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
