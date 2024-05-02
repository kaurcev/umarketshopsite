import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png'
import serverUrl from "../config";
import '../styles/header.css';

export default function Header() {
    const navigate = useNavigate();
    const [searchtext, setSearchtext] = useState('');
    const [geo, setGeo] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    const getStatus = async () => {
        fetch(`//${serverUrl}/api/status.php`)
        .then(response => response.json())
        .then(data => {
            if(!data.status){
                navigate('/500')
            }
        })
        .catch(error => {
            navigate('/500')
    });
    }
    const getCity = async () => {
        fetch(`//get.geojs.io/v1/ip/geo.json`)
        .then(response => response.json())
        .then(data => {
            setGeo(data);
        })
        .catch(error => {
            console.log(error);
        })
    };
    getStatus();
    getCity();
    // eslint-disable-next-line
    }, []); // Пустой массив зависимостей

    
    const searchHandler = (event) => {
        setSearchtext(event.target.value);
      };

      const submitHandler = (event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        params.append('search', searchtext);
        navigate(`/search?${params.toString()}`)
      };

    return (
        <>
          <header>
            <div className="header">
                <div className='minipan'>
                    <span>
                        <Link to="/profile/wallet">{geo.country_code3}</Link>
                        <Link to="/profile/"><i  className="fa fa-location-arrow" aria-hidden="true"></i> {geo.city} | {geo.region}</Link>
                        <Link className='betatest'><i  className="fa fa-exclamation-triangle" aria-hidden="true"></i> Идёт тестирование системы</Link>
                    </span>
                    <span>
                        <Link className='info' to="/startposrav">Как стать поставщиком</Link>
                        <Link to="/application">Мобильное приложение</Link>
                        <Link to="/stocks">Акции</Link>
                        <Link to="/help">Помощь</Link>
                    </span>
                </div>
                <div className='mainpan'>       
                <img onClick={() => navigate("/")} className='logo' src={logo} alt="юМаркет Шоп"/>
                <form className='search' onSubmit={submitHandler}>
                     <input placeholder="Введите для поиска" onChange={searchHandler}  />
                    <button type="">Поиск</button>
                </form>
                <nav>
                    {
                        localStorage.getItem('token') ? (
                            <>
                            <Link to="/">
                            <i  className="fa fa-home" aria-hidden="true"></i>
                            <span>Главная</span>
                            </Link>
                            <Link to="/basket">
                            <i  className="fa fa-shopping-cart" aria-hidden="true"></i>
                            <span>Корзина</span>
                            </Link>
                            <Link to="/profile">
                            <i  className="fa fa-user" aria-hidden="true"></i>
                            <span>Профиль</span>
                            </Link>
                            </>
                        ) : (
                            <>
                            <Link to="/auth">
                            <i  className="fa fa-sign-in" aria-hidden="true"></i>
                            <span>Войти</span>
                            </Link>
                            </>
                        )
                    }
                </nav>
                </div>
            </div>
          </header>
          </>
    );
}