import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import serverUrl from "../config";
import Header from '../components/Header';

export default function ProfileEditPage() {
    document.title = "Редактирование профиля";
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [address, setAddress] = useState('');

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
    const addressHandler = (event) => {
        setAddress(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        EditdataloadRequest();
      };
    
    function EditdataloadRequest() {
        const params = new URLSearchParams();
        params.append('email', email);
        params.append('phone', phone);
        params.append('surname', surname);
        params.append('name', name);
        params.append('firstname', firstname);
        params.append('address', address);
        params.append('me', localStorage.getItem('token'));
        fetch(`//${serverUrl}/api/user/edit.php?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            if(data.status){
                alert(`Ответ сервера: ${data.message}`);
                navigate('/profile')
            }else{
                alert(`Ответ сервера: ${data.message}`);
            }
        })
        .catch(error => {
            alert(`501 ошибка: ${error.message}`);
            console.error(error);
        });
    }


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
            setEmail(jsonData.data.email);
            setPhone(jsonData.data.phone);
            setSurname(jsonData.data.surname);
            setName(jsonData.data.name);
            setFirstname(jsonData.data.firstname);
            setAddress(jsonData.data.address);
            window.scrollTo(0, 0);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
        // eslint-disable-next-line
    }, []); // Пустой массив зависимостей
    return (
        <>
        <Header />
        <main className='profile'>
        <div className='w250'>
        <Link className='bt' to='/profile'>Вернуться назад</Link>
        </div>
        <div className='page'>
                {loading ? (
                    <>
                        <p>Загрузка данных</p>
                    </>
                ) : (
                    <>
                    <h4>РЕДАКТИРОВАНИЕ ПРОФИЛЯ</h4>
                    <hr />
                        <form onSubmit={submitHandler}>
                            <p>
                                <p className='mini'>Почта</p>
                                <input type="email" name="email" defaultValue={data.email} onChange={emailHandler} />
                            </p>
                            <p>
                                <p className='mini'>Номер телефона</p>
                                <input type="tel" name="phone" defaultValue={data.phone} onChange={phoneHandler} />
                            </p>
                            <p>
                                <p className='mini'>Ваше имя</p>
                                <input type="text" name="name" defaultValue={data.name} onChange={nameHandler} />
                            </p>
                            <p>
                                <p className='mini'>Ваша фамилия</p>
                                <input type="text" name="surname" defaultValue={data.surname} onChange={surnameHandler} />
                            </p>
                            <p>
                                <p className='mini'>Ваше отчество</p>
                                <input type="text" name="firstname" defaultValue={data.firstname} onChange={firstnameHandler} />
                            </p>
                            <p>
                                <p className='mini'>Адрес для доставки</p>
                                <input type="text" name="address" defaultValue={data.address} onChange={addressHandler} />
                            </p>
                            <p>
                                <button>Сохранить данные</button>
                            </p>
                            <p>
                                <button type="reset">Отменить изменения</button>
                            </p>
                        </form>
                    <p><Link to='/profile'>Вернуться</Link></p>
                    </>
                )}
            </div>
        </main>
    </>
    )
}
  