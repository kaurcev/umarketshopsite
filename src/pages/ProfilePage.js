import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { serverUrl } from "../config";
import {getBrowser, getDevice} from "../functions";
import Header from '../components/Header';
import '../styles/profile.css';
import Footer from '../components/Footer';

export default function ProfilePage() {
    document.title = "Профиль";
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [session, setSession] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
        try {
            setLoading(true);        
            if(localStorage.getItem('token') == null){
            navigate('/auth')
            }
            const params = new URLSearchParams();
            params.append('me', localStorage.getItem('token'));
            const response = await fetch(`//${serverUrl}/getinformation?${params.toString()}`);
            const jsonData = await response.json();
            setData(jsonData.data);
            if(!jsonData.status){
                navigate('/logout')
            }
            const paramso = new URLSearchParams();
            paramso.append('me', jsonData.data.id);
            const responses = await fetch(`//${serverUrl}/profile/sessions?${params.toString()}`);
            const jsonSession = await responses.json();
            setSession(jsonSession.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
        // eslint-disable-next-line
    }, []); // Пустой массив зависимостей



    const sessionExit = async (id) => {
        try { 
            const params = new URLSearchParams();
            params.append('me', localStorage.getItem('token'));
            params.append('id', id);
            const response = await fetch(`//${serverUrl}/profile/session/logout?${params.toString()}`);
            const jsonData = await response.json();
            if(jsonData.status){
                setSession(prevData => prevData.filter(item => item.id !== id));
            }
        } catch (error) {
            console.log(error);
        } 
    };
    return (
        <>
        <Header />
        <main className='profile'>
        <div className='w250'>
        <Link className='bt' to='/profile/edit'>Редактировать данные</Link>
        <Link className='bt' to='/profile/wallet'>Кошелёк</Link>
        <Link className='bt' to='https://bugs.umarketshop.site/'>Баг-треккер</Link>
        {data.roleid === "2" ? (<Link className='bt' to='/profile/postav'>Панель поставщика</Link>) : null}
        {data.roleid === "3" ? (<Link className='bt' to='/profile/admin'>Панель администратора</Link>) : null}
        <Link className='bt red' to='/logout'>Выход</Link>
        </div>
        <div className='page'>
            {loading ? (
                <>
                <h4>ВАШИ ДАННЫЕ</h4>
                <div className='cartpanel'>
                    <h2>Карточка пользователя</h2>
                    <div className='load'></div>
                    <div className='load'></div>
                    <div className='load'></div>
                    <div className='load'></div>
                    <div className='load'></div>
                </div>
                <h4>ВАШИ ВОЗМОЖНОСТИ</h4>
                <div className='load'></div>
            </>
            ) : (
                <>
                    <h4>ВАШИ ДАННЫЕ</h4>
                    <div className='cartpanel'>
                        <h2>Карточка пользователя</h2>
                        <p className='mini'>{data.role}</p>
                        <p>{data.surname} {data.name} <span>{data.firstname}</span></p>
                        <p className='mini'>В числе участников с {data.created}</p>
                        <p><span className='mini'>{data.email}</span> <span className='mini'>{data.phone}</span></p>
                        <p>Адрес доставки: {data.address}</p>
                    </div>
                    <h4>ВАШИ ВОЗМОЖНОСТИ</h4>
                    <p>{data.rdescription}</p>  
                </>
            )}
            <h4>ТЕКУЩИЕ СЕАНСЫ</h4>
            <p className='mini'>Если вы видете незнакомый для вас сеанс - <b>завершите сессию</b></p>
            <div className='session'>
            {loading ? (
            <>
                <div className='cart load'>
                    <div className='icod'>
                        <span className='big'></span>
                    </div>
                    <div className='w100'>
                    </div>
              </div>
              <div className='cart load'>
                    <div className='icod'>
                        <span className='big'></span>
                    </div>
                    <div className='w100'>
                    </div>
              </div>
            </>
          ) : (
            session.map((item) => (        
              <div className='cart' key={item.id}>
                <div className='infosession'>
                <div className='icod'>
                    <span className='big'>{getDevice(item.useragent)}</span>
                </div>
                <div>
                <p>{getBrowser(item.useragent)}</p>
                <p className='mini'>{item.ip} - {item.created}</p>
                </div>
                </div>
                <p className='center red' onClick={() => sessionExit(item.id)}>Завершить сеанс</p>
              </div>
            ))
          )}
            </div>
         </div>
        </main>
        <Footer />
        </>
    )
  }
  