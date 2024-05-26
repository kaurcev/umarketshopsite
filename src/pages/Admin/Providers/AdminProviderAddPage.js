import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../config";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalAlert from "../../../components/ModalAlert";
import NoAuthPage from "../../../pages/NoAuthPage";

export default function AdminProviderAddPage() {
  document.title = "Добавление поставщика";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [description, setDescription] = useState("");
  const [providerid, setProviderid] = useState("");
  const [name, setName] = useState("");
  const [prodo, setProdo] = useState("0");
  const [manager, setManager] = useState("");
  const [managerid, setManagerid] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const postavusername = searchParams.get("username");
  const postavname = searchParams.get("name");
  const postavdesc = searchParams.get("desc");

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

  const usernameHandler = (event) => {
    setManagerid(event.target.value);
  }

  const checkusername = async (name) => {
    const params = new URLSearchParams();
    params.append("u", name);
    params.append("me", localStorage.getItem('token'));
    try {
      const response = await fetch(
        `//${serverUrl}/api/adminpanel/checkusername.php?${params.toString()}`
      );
      const jsonTrans = await response.json();
      if (jsonTrans.status) {
        setManager(`${jsonTrans.data.surname} ${jsonTrans.data.name} ${jsonTrans.data.firstname}`);
        setProviderid(jsonTrans.data.id)
      } else {
        setManager("");
      }
    } catch (error) {
      showModalWithText(error.message);
    }
  };

  useEffect(() => {
    if (postavusername !== null) {
      setManagerid(postavusername);
      checkusername(postavusername);
    }
    if (postavname !== null) {
      setName(postavname);
    }
    if (postavdesc !== null) {
      setDescription(postavdesc);
    }
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


  const addpostav = async (event) => {
    event.preventDefault();
    if (manager === "") return null;
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("name", name);
      params.append("desc", description);
      params.append("manager", providerid);
      params.append("prodo", prodo);
      params.append("me", localStorage.getItem('token'));
      const responses = await fetch(
        `//${serverUrl}/api/adminpanel/providers/add.php?${params.toString()}`
      );
      const jsonTrans = await responses.json();
      if (jsonTrans.status) {
        navigate("/profile/admin/providers")
      }
      showModalWithText(jsonTrans.message);
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!localStorage.getItem('token')) return (<><NoAuthPage /></>);
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
              <h1>Новая оргаинзация поставщика</h1>
              <p>Перед процедурой создания организации поставщика удостоверьтесь, что аккаунт поставщика имеет роль поставщика</p>
              <h3>Менеджер</h3>
              <p>Вы не сможете создать поставщика, не указав будущего менеджера</p>
              <div className="duo b">
                <input placeholder="Введите юзернейм" onChange={usernameHandler} type="text" value={managerid} />
                <button className="o" onClick={() => checkusername(managerid)}>Проверка пользователя</button>
              </div>
              {manager !== "" ? (
                <p className="mini"><span className="green"><i class="fa fa-check" aria-hidden="true"></i></span> В роли менеджера поставок на {name} будет выбран {manager}</p>
              ) : (
                <p className="mini"><span className="reds"><i class="fa fa-times" aria-hidden="true"></i></span> Пользователь не найден</p>
              )}
              <form onSubmit={addpostav}>
                <p className="mini">Название поставщика<span className="red">*</span></p>
                <input placeholder="Наименование организации-поставщика" required maxLength="50" type="text" onChange={nameHandler} value={name} />
                <p className="mini">Описание поставщика<span className="red">*</span></p>
                <textarea placeholder="Описание организации поставщика" required maxLength="50" type="text" onChange={descriptionHandler} value={description} />
                <p className="mini">Работа поставщика</p>
                <select onChange={prodoHandler} value={prodo}>
                  <option value="0">Отключена</option>
                  <option value="1">Включена</option>
                </select>
                <h4>Email и номер телефона</h4>
                <p className="mini">Электронная почта и телефонный номер будут указаны в соответствии с данными менеджера</p>
                {loading ? (
                  <button disabled>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                  </button>
                ) : (
                  <>
                    {manager !== "" ? (<button>Сохранить</button>) : <button disabled>Сохранить</button>}
                  </>
                )}
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
