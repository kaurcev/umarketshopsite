import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import serverUrl from "../config";
import {getBrowser, getDevice} from "../functions";
import Header from '../components/Header';

export default function ProfilePage() {
    document.title = "Профиль";
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [session, setSession] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);        
            if(localStorage.getItem('token') == null){
            navigate('/auth')
            }
            const params = new URLSearchParams();
            params.append('me', localStorage.getItem('token'));
            const response = await fetch(`//${serverUrl}/api/user/getinfo.php?${params.toString()}`);
            const jsonData = await response.json();
            setData(jsonData.data);
            if(!jsonData.status){
                navigate('/logout')
            }
            const paramso = new URLSearchParams();
            paramso.append('me', jsonData.data.id);
            const responses = await fetch(`//${serverUrl}/api/user/sessions.php?${params.toString()}`);
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
            setLoading(true);        
            const params = new URLSearchParams();
            params.append('me', localStorage.getItem('token'));
            params.append('id', id);
            const response = await fetch(`//${serverUrl}/api/user/session_delete.php?${params.toString()}`);
            const jsonData = await response.json();
            if(jsonData.status){
                setSession(prevData => prevData.filter(item => item.id !== id));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Header />
        <main className='profile'>
        <div className='w250'>
        <Link className='bt' to='/profile/edit'>Редактировать данные</Link>
        {data.roleid === "2" ? (<Link className='bt' to='/postav'>Панель поставщика</Link>) : null}
        {data.roleid === "3" ? (<Link className='bt' to='/admin'>Панель администратора</Link>) : null}
        </div>
        <div className='page'>
            {loading ? (
                <>
                    <p>Загрузка данных</p>
                </>
            ) : (
                <>
                    <h4>ВАШИ ДАННЫЕ</h4>
                    <hr />
                    <p>Ваш email: {data.email}</p>
                    <p>Ваш номер телефона: {data.phone}</p>
                    <p>Ваше имя: {data.name}</p>
                    <p>Ваш фамилия: {data.surname}</p>
                    <p>Ваше отчетсво: {data.firstname}</p>
                    <p>Дата создания аккаунта: {data.created}</p>
                    <p>Роль: {data.role}</p>
                    <p>Описание роли: {data.rdescription}</p>
                    <p>Адрес доставки: {data.address}</p>
                </>
            )}
            <h4>ТЕКУЩИЕ СЕАНСЫ</h4>
            <div className='session'>
            {loading ? (
            <>
            <p>Загрузка</p>
            </>
          ) : (
            session.map((item) => (        
              <div className='cart' key={item.id}>
                <div className='icod'>
                    <span className='big'>{getDevice(item.useragent)}</span>
                </div>
                <div className='w100'>
                <p>{getBrowser(item.useragent)}</p>
                <p className='mini'>{item.ip} - {item.created}</p>
                </div>
                <p className='center red' onClick={() => sessionExit(item.id)}>Завершить сеанс <i class="fa fa-sign-out" aria-hidden="true"></i></p>
              </div>
            ))
          )}
            </div>
         </div>
        </main>
        </>
    )
  }
  