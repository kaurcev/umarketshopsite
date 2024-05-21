import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/FormAuth.css';
import { serverUrl } from "../config";
import ModalAlert from './ModalAlert';
import logo from '../img/logo.png'


export default function FormSignIn(){
    document.title = "Авторизация";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Для отображения модального окна
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');
    
    const showModalWithText = (text) => {
        setModalText(text); // Устанавливаем текст для модального окна
        setShowModal(true); // Показываем модальное окно
        setTimeout(() => {
        setShowModal(false); // Автоматически скрываем модальное окно через 3 секунды
        }, 1500);
    };


    const usernameHandler = (event) => {
        setUsername(event.target.value);
    };
    
    const passwordHandler = (event) => {
        setPassword(event.target.value);
    };
    
    const submitHandler = (event) => {
        event.preventDefault();
        loginRequest(username, password);
    };

    const loginRequest = async (usernametext, passwordtext) => {
        if(usernametext === "" || passwordtext === ""){
            showModalWithText("Вы не указали данных");
        }else{
        const params = new URLSearchParams();
        params.append('username', usernametext);
        params.append('password', passwordtext);
        try {
            setLoading(true);        
            const responses = await fetch(`//${serverUrl}/signin?${params.toString()}`);
            const jsonTrans = await responses.json();
            if (jsonTrans.status) {
                console.log(jsonTrans.data.token);
                localStorage.setItem('token', jsonTrans.data.token);
                navigate('/');
            }else{
                showModalWithText(jsonTrans.message)
            }
        } catch (error) {
            showModalWithText(error.message)
        } finally {
            setLoading(false);
        }
        }
        };

    return(
        <>
        <ModalAlert show={showModal} onClose={() => setShowModal(false)} text={modalText} />
        <form className='auth' onSubmit={submitHandler}>
            <img className='logo' src={logo} alt="юМаркет Шоп"/>
            <h3>Авторизация</h3>
            <p className="mini">Логин</p>
            <input maxLength="50" placeholder='Имя пользователя или email' type="text" value={username} onChange={usernameHandler} />
            <p className="mini">Пароль</p>
            <input maxLength="50" placeholder='Ваш пароль' type="password" value={password} onChange={passwordHandler} />
            {loading ? (<p><button disabled><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></button></p>) : 
            (<p><button>Войти</button></p>)}
            <p className='center'><Link to='/signup'>Ещё нет аккаунта</Link></p>
        </form>
        </>
    )
}