import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import serverUrl from "../config";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PostavEditPage() {
  document.title = "Панель поставщика | Редактирование";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [prodo, SetProdo] = useState('');

  useEffect(() => {
      const fetchData = async () => {
      try {
          setLoading(true); 
          window.scrollTo(0, 0)       
          const params = new URLSearchParams();
          params.append('me', localStorage.getItem('token'));
          const response = await fetch(`//${serverUrl}/api/provider/meprovider.php?${params.toString()}`);
          const jsonData = await response.json();
          setData(jsonData.data);
          setName(jsonData.data.name);
          setDescription(jsonData.data.description);
          SetProdo(jsonData.data.prodo);
      } catch (error) {
          console.log(error);
      } finally {
          setLoading(false);
      }
      };
      fetchData();
      // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

    const nameHandler = (event) => {
        setName(event.target.value);
    };
    const descriptionHandler = (event) => {
        setDescription(event.target.value);
    };
    const prodoHandler = (event) => {
        SetProdo(event.target.value);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        EditdataloadRequest();
    };

    function EditdataloadRequest() {
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('description', description);
        params.append('prodo', prodo);
        params.append('me', localStorage.getItem('token'));
        fetch(`//${serverUrl}/api/provider/editprovider.php?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            if(data.status){
                alert(`Ответ сервера: ${data.message}`);
                navigate('/profile/postav')
            }else{
                alert(`Ответ сервера: ${data.message}`);
            }
        })
        .catch(error => {
            alert(`501 ошибка: ${error.message}`);
            console.error(error);
        });
    }
    return (
      <>
       <Header />
        <main className='profile pay'>
        <div className='w250'>
        <Link className='bt' to='/profile/postav'>Вернуться назад</Link>
        </div>
        <div className='page'>
            {loading ? (
                <>
                Загрузка
                </>
            ) : (
                <>
                    <h4>ПАНЕЛЬ ПОСТАВЩИКА | РЕДАКТИРОВАНИЕ</h4>
                        <form onSubmit={submitHandler}>
                            <p>
                                <p className='mini'>Название</p>
                                <input type="text" name="name" defaultValue={data.name} onChange={nameHandler} />
                            </p>
                            <p>
                                <p className='mini'>Описание</p>
                                <input type="text" name="description" defaultValue={data.description} onChange={descriptionHandler} />
                            </p>
                            <p>
                                <p className='mini'>Работоспособнось</p>
                                <label>
                                <select name="prodo" defaultValue={data.prodo} onChange={prodoHandler}>
                                    <option value="1">Работает</option>
                                    <option value="0">Не работает</option>
                                </select>
                                <p className='mini'>Если указать "Не работает", ваши товары будут недоступны и Вы не будете отображаться в списках поставщиков</p>
                                </label>
                            </p>
                            <p>
                                <button>Сохранить данные</button>
                            </p>
                            <p>
                                <button className='red' type="reset">Отменить изменения</button>
                            </p>
                        </form>
                </>
            )}
             </div> 
        </main>
        <Footer />
        </>
    )
  }
  