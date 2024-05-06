import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/FormSignUp.css';
import serverUrl from "../config";
import ModalAlert from './ModalAlert';
import logo from '../img/logo.png'


export default function FormSignUp(){
    document.title = "Регистрация";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');


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

    const submitHandler = (event) => {
        event.preventDefault();
        SigninRequest(username, password,surname,name,firstname,email);
    };

    const SigninRequest = async (usernametext, passwordtext, surnametext, nametext, firstnametext, emailtext) => {
        if(usernametext === "" || passwordtext === "" || surnametext === ""||nametext === "" ||emailtext === ""){
            showModalWithText("Вы не указали данных");
        }else{
        const params = new URLSearchParams();
        params.append('username', usernametext);
        params.append('password', passwordtext);
        params.append('surname', surnametext);
        params.append('name', nametext);
        params.append('firstname', firstnametext);
        params.append('email', emailtext);
        try {
            setLoading(true);        
            const responses = await fetch(`//${serverUrl}/signup?${params.toString()}`);
            const jsonTrans = await responses.json();
            if (jsonTrans.status) {
                showModalWithText(jsonTrans.message);
                setTimeout(navigate('/auth'), 3000);
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
         <form className='signin' onSubmit={submitHandler}>
         <img className='logo' src={logo} alt="юМаркет Шоп"/>
         <div className='duo'>
            <div>
               <h4> Ваши данные</h4>
               <p className='mini'>Указывайте в соответствии с паспортом</p>
            </div>
            <div>
                <p className="mini">Фамилия</p>
                <input type="text" placeholder='Ваша фамилия' maxLength="100" value={surname} onChange={surnameHandler} />
                <p className="mini">Имя</p>
                <input type="text" placeholder='Ваше имя' maxLength="100" value={name} onChange={nameHandler} />
                <p className="mini">Отчество <span className='mini'>(При наличии)</span></p>
                <input type="text" placeholder='Ваше отчество' maxLength="100" value={firstname} onChange={firstnameHandler} />
              </div>
         </div>
            <div className='duo'>
                <div>
                    <h4> Ваши данные в юМаркет Шоп</h4>
                    <p className='mini'>Эти данные будут использоваться в нашей системе</p>
                </div>
                <div>
                    <p className="mini">Ваш email</p>
                    <input type="email" placeholder='Ваш email' maxLength="100" value={email} onChange={emailHandler} />
                    <p className="mini">Логин</p>
                    <input type="text" placeholder='Придумайте логин' maxLength="100" value={username} onChange={usernameHandler} />
                    <p className="mini">Пароль</p>
                    <input type="password" placeholder='Придумайте пароль' maxLength="100"  value={password} onChange={passwordHandler} />
                    <p className="mini">Повторите пароль</p>
                    <input type="password" placeholder='Повторите пароль' maxLength="100" value={password} onChange={passwordHandler} />
                </div>
            </div>
              <div className='center'>
                <p>
                {loading ? (<button disabled><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></button>) : 
                (<button>Зарегистрироваться</button>)}
                </p>
                <p className='mini w'>Нажимая "Зарегистрироваться" вы соглашаетесь с <Link to='/privacy'>Политикой конфиденциальности</Link> и <Link to='/use-terms'>правилами использования</Link></p>
                <p className='center'><Link to='/auth'>Уже есть аккаунт</Link></p>
              </div>
            </form>
        </>
    )
}