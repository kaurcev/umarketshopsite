import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../config";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalAlert from "../../../components/ModalAlert";

export default function MainPage() {
  document.title = "Редактирование пользователя";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [description, setDescription] = useState("");
  const [providerid, setProviderid] = useState("");
  const [name, setName] = useState("");
  const [prodo, setProdo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [manager, setManager] = useState("");
  const [managerid, setManagerid] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const postavid = searchParams.get("id");

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

  const usernameHandler= (event) => {
    setManagerid(event.target.value);
  }

  const checkusername = async (name) => {
    const params = new URLSearchParams();
    params.append("u", name);
    params.append("me", localStorage.getItem('token'));
    try{
      const response = await fetch(
        `//${serverUrl}/api/adminpanel/checkusername.php?${params.toString()}`
      );
      const jsonTrans = await response.json();
      if(jsonTrans.status){
        setManager(`${jsonTrans.data.surname} ${jsonTrans.data.name} ${jsonTrans.data.firstname}`);
        setProviderid(jsonTrans.data.id)
      }else{
        setManager("");
      }
    }catch(error){
        showModalWithText(error.message);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("id", postavid);
      params.append("me", localStorage.getItem('token'));
      const responses = await fetch(
        `//${serverUrl}/api/adminpanel/providers/one.php?${params.toString()}`
      );
      const jsonTrans = await responses.json();
      setData(jsonTrans.data);
      if(jsonTrans.status){
        setDescription(jsonTrans.data.description);
        setName(jsonTrans.data.name);
        setProdo(jsonTrans.data.prodo);
        setEmail(jsonTrans.data.email);
        setPhone(jsonTrans.data.phone);
        setManagerid(jsonTrans.data.username);
        checkusername(jsonTrans.data.username);
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

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const prodoHandler = (event) => {
    setProdo(event.target.value);
  };


  const deleteprofile = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("id", postavid);
      params.append("me", localStorage.getItem('token'));
      const responses = await fetch(
        `//${serverUrl}/api/adminpanel/providers/delete.php?${params.toString()}`
      );
      const jsonTrans = await responses.json();
      if(jsonTrans.status){
        navigate("/profile/admin/providers")
      }
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setLoading(false);
    }
  }

  const updatedata = async (event) => {
    event.preventDefault();
    if(manager ==="") return null;
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("id", postavid);
      params.append("manager", providerid);
      params.append("description", description);
      params.append("name", name);
      params.append("prodo", prodo);
      params.append("me", localStorage.getItem('token'));
      const responses = await fetch(
        `//${serverUrl}/api/adminpanel/providers/update.php?${params.toString()}`
      );
      const jsonTrans = await responses.json();
      if(jsonTrans.status){
        navigate("/profile/admin/providers")
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
          <Link className="bt" to="/profile/admin/providers">
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
              <h1>{data.name}</h1>
              <h3>Менеджер</h3>
                  <div className="duo b">
                    <input onChange={usernameHandler} type="text" value={managerid} />
                    <button className="o" onClick={() => checkusername(managerid)}>Проверка пользователя</button>
                  </div>
                  {manager !== "" ? (
                  <p className="mini"><span className="green"><i class="fa fa-check" aria-hidden="true"></i></span> В роли менеджера поставок на {name} будет выбран {manager}</p>
                  ) : (
                  <p className="mini"><span className="reds"><i class="fa fa-times" aria-hidden="true"></i></span> Пользователь не найден</p>
                  )}
              <h3>Данные организации</h3>
              <form onSubmit={updatedata}>
              <p className="mini">Название поставщика<span className="red">*</span></p>
                  <input required maxLength="50" type="text" onChange={nameHandler} value={name} />
                  <p className="mini">Описание поставщика<span className="red">*</span></p>
                  <textarea required maxLength="50" type="text" onChange={descriptionHandler} value={description} />
                  <p className="mini">Работа поставщика</p>
                  <select onChange={prodoHandler} value={prodo}>
                    <option value="0">Отключена</option>
                    <option value="1">Включена</option>
                  </select>
                  <h4>Информация ниже берется из профиля менеджера</h4>
                  <p className="mini">Электронная почта</p>
                  <p>{email}</p>
                  <p className="mini">Номер телефона</p>
                  <p>{phone}</p>
                  {loading ? (
                  <button disabled>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                    </button>
                  ) : (
                    <>
                    {manager !== "" ? (<button>Сохранить</button>) : <button disabled>Сохранить</button>}
                    </>
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
