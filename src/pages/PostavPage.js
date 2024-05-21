import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import { serverUrl } from "../config";
import Footer from '../components/Footer';

export default function PostavPage() {
  document.title = "Панель поставщика";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
      try {
          setLoading(true); 
          window.scrollTo(0, 0)       
          const params = new URLSearchParams();
          params.append('me', localStorage.getItem('token'));
          const response = await fetch(`//${serverUrl}/provider/me?${params.toString()}`);
          const jsonData = await response.json();
          setData(jsonData.data);
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
        <Link className='bt' to='/profile/postav/edit'>Редактировать данные</Link>
        <Link className='bt' to='/profile/postav/prodo'>Ваши товары</Link>
        <Link className='bt' to='/profile/postav/stoks'>Ваши акции</Link>
        <Link className='bt' to='/profile/postav/replys'>Отзывы товарам</Link>
        </div>
        <div className='page'>
            {loading ? (
                <>
                Загрузка
                </>
            ) : (
                <>
                    <h4>ПАНЕЛЬ ПОСТАВЩИКА</h4>
                    <div>
                        <div className='duo'>
                        <div className='cartpanel'>
                        <h2>{data.name}</h2>
                        <p>В числе поставщиков с: {data.datecreate}</p>
                          {data.prodo === "1" ? (<><p className='mini'>Организация функционирует и товары отображаются в каталоге</p></>) : ( <><p className='mini'>Организация отключена и товары не отображаются в каталоге</p></>) }
                        </div>
                        <div className='cartpanel'>
                            <p className='mini'>Email: </p>
                            <p>{data.email}</p>
                            <p className='mini'>Номер телефона</p>
                            <p>{data.phone}</p>
                        </div>
                        </div>
                        <p className='mini'>Описание</p>
                        <pre>{data.description}</pre>
                    </div> 
                </>
            )}
             </div> 
        </main>
        <Footer />
        </>
    )
  }
  