import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from '../components/Footer';
import { YandexMetrica, AnalyticsGoogle } from '../config'

export default function AdminPage() {
  document.title = "Панель администратора";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
      const fetchData = async () => {
      try {
          setLoading(true); 
          window.scrollTo(0, 0)       
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
  
  