import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from '../components/Footer';

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
                    <div>

                    </div> 
                </>
            )}
             </div> 
        </main>
        <Footer />
        </>
    )
  }
  
  