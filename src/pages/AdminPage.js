import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from '../components/Footer';
import { YandexMetrica, AnalyticsGoogle } from '../config'

export default function AdminPage() {
  document.title = "Панель администратора";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [local, setLocal] = useState('');

  useEffect(() => {
      const fetchData = async () => {
      try {
          setLoading(true); 
          window.scrollTo(0, 0);
          setLocal(localStorage.getItem('local'));
          // const params = new URLSearchParams();
          // params.append('me', localStorage.getItem('token'));
          // const response = await fetch(`//${serverUrl}/api/provider/meprovider.php?${params.toString()}`);
          // const jsonData = await response.json();
          // setData(jsonData.data);
      } catch (error) {
          console.log(error);
      } finally {
          setLoading(false);
      }
      };
      fetchData();
      // eslint-disable-next-line
  }, []); // Пустой массив зависимостей


 

    const localHandler = (event) => {
        setLocal(event.target.value);
        if(local === 1){
            localStorage.setItem('local', event.target.value);
            alert("Вы переключили сервер на локальный. Войдите на локальную учётную запись");
            navigate('/logout');
        }else{
            localStorage.setItem('local', event.target.value);
            alert("Вы переключили сервер на глобальный. Войдите на глобальную учётную запись");
            navigate('/logout');
        }
    };


    return (
      <>
       <Header />
        <main className='profile pay'>
        <div className='w250'>
        <Link className='bt' to='/profile'>Вернуться назад</Link>
        <Link className='bt' to='/profile/admin/users'>Пользователи</Link>
        <Link className='bt' to='/profile/admin/prodo'>Товары</Link>
        <Link className='bt' to='/profile/admin/stocks'>Акции</Link>
        <Link className='bt' to='/profile/admin/trans'>Тракнзакции</Link>
        </div>
        <div className='page'>
            {loading ? (
                <>
                Загрузка
                </>
            ) : (
                <>
                    <h4>ПАНЕЛЬ АДМИНИСТРАТОРА</h4>
                    <div className='grid'>
                    <div>
                        <p>Убедитесь, что на <i>127.0.0.1</i> развёрнута серверная часть</p>
                    <select defaultValue={localStorage.getItem('local')}  onChange={localHandler}>
                        <option value="0">Глобальный сервер</option>
                        <option value="1">Локальный сервер</option>
                    </select>
                    <p>Статус локального сервера: {local === "1" ? (<>Включён</>) : (<>Выключен</>)}</p>
                    </div>
                    <div className='cartpanel'>
                        <h4>Все товары</h4>
                        <p>Перейдите для контроля</p>
                    </div>
                    <div className='duo'>
                    <div className='cartpanel'>
                        <h4>Все акции</h4>
                        <p>Перейдите для контроля</p>
                    </div>
                    <div className='cartpanel'>
                        <h4>Все пользователи</h4>
                        <p>Перейдите для контроля</p>
                    </div>
                    </div>
                    <div className='cartpanel'>
                        <h4>Все транкзакции</h4>
                        <p>Перейдите для контроля</p>
                    </div>
                    <div className='duo'>
                    <Link to={YandexMetrica} className='cartpanel'>
                        <h4>Yandex Metrika</h4>
                        <p>Нажмите для перехода</p>
                    </Link>
                    <Link to={AnalyticsGoogle} className='cartpanel'>
                        <h4>Google Analytics</h4>
                        <p>Нажмите для перехода</p>
                    </Link>
                    </div>
                    </div> 
                </>
            )}
             </div> 
        </main>
        <Footer />
        </>
    )
  }
  
  