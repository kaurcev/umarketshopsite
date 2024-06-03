import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import { serverUrl } from "../config";
import "../styles/header.css";
import ModalAlert from "./ModalAlert";

export default function Header() {
  const navigate = useNavigate();
  const [searchtext, setSearchtext] = useState("");
  const [geo, setGeo] = useState("");
  const [adress, setAdress] = useState("");
  const [wallet, setWallet] = useState("");
  const [roleid, setRoleID] = useState("");
  const [data, setData] = useState([]);
  let searchTimeout;

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
    window.scrollTo(0, 0);
    const getStatus = async () => {
      fetch(`//${serverUrl}/live`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.status) {
            navigate("/500");
          }
        })
        .catch((error) => {
          navigate("/500");
        });
    };

    const fetchData = async () => {
      if (localStorage.getItem('token') !== null) {
        const params = new URLSearchParams();
        params.append('me', localStorage.getItem('token'));
        fetch(`//${serverUrl}/getinformation?${params.toString()}`)
          .then((response) => response.json())
          .then((data) => {
            setWallet(data.data.wallet);
            setRoleID(data.data.roleid)
            if (data.data.address !== "Адрес не указан") {
              setAdress(data.data.address);
            } else {
              getCity();
            }
            if (!data.status) {
              navigate('/logout');
            } else if (data.data.block === "1") {
              alert("Ваш аккаунт был заблокирован администратором. Свяжитесь с нами по почте, указанной в подвале сайта для уточнения деталей");
              navigate('/logout');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      getCity();
    };

    const getCity = async () => {
      fetch(`//get.geojs.io/v1/ip/geo.json`)
        .then((response) => response.json())
        .then((data) => {
          setGeo(data);
          setAdress(`${data.city} ${data.region}`)
        })
        .catch((error) => {
          let data = {
            'city': "Неизвестно",
            'region': "Бог знает"
          }
          setGeo(data);
        });
    };
    getStatus();
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  const searchHandler = (event) => {
    clearTimeout(searchTimeout);
    setSearchtext(event.target.value);
    searchTimeout = setTimeout(varik, 500);
  };


  const varik = async () => {
    try {
      const params = new URLSearchParams();
      params.append("search", searchtext);
      const responses = await fetch(
        `//${serverUrl}/product/search?${params.toString()}`
      );
      const jsonData = await responses.json();
      setData(jsonData.data);
    } catch (error) {
      showModalWithText(error.message);
    }
  };


  const submitHandler = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.append("search", searchtext);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <>
      <ModalAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        text={modalText}
      />
      <header>
        <div className="header">
          <div className="minipan">
            <span>
              {
                roleid > 0 ? (<Link to="/profile/wallet">{wallet}₽ | {geo.country_code3}</Link>) : (<Link>{geo.country_code3}</Link>)
              }
              <Link to="/profile/">
                <i className="fa fa-location-arrow" aria-hidden="true"></i>{" "}
                {adress}
              </Link>
            </span>
            <span>
              {
                roleid === "1" ? (<Link className="info" to="/startposrav">
                  Как стать поставщиком
                </Link>) : null
              }
              <Link to="/application">Мобильное приложение</Link>
              <Link to="/stocks">Акции</Link>
              <Link to="/help">Помощь</Link>
            </span>
          </div>
          <div className="mainpan">
            <img
              onClick={() => navigate("/")}
              className="logo"
              src={logo}
              alt="юМаркет Шоп"
            />
            <form className="search" onSubmit={submitHandler}>
              <input
                required
                placeholder="Введите для поиска"
                onChange={searchHandler}
                maxLength={40}
                list="searchvar"
              />
              <datalist id="searchvar">
                {data.map((item) => (
                  <option key={item.id} value={item.name} />
                ))}
              </datalist>
              <button type="">Поиск</button>
            </form>
            <nav>
              {localStorage.getItem("token") ? (
                <>
                  <Link to="/">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <span>Главная</span>
                  </Link>
                  <Link to="/basket">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span>Корзина</span>
                  </Link>
                  <Link to="/profile">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <span>Профиль</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                    <span>Войти</span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
