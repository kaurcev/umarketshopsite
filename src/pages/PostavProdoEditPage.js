import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import Header from "../components/Header";
import {serverUrl } from "../config";
import Footer from '../components/Footer';
import LoadImages from '../components/LoadImages';

export default function PostavProdoEditPage() {
  document.title = "Панель поставщика | Редактирование товара";
  const [data, setData] = useState([]);
  const [stoks, setStoks] = useState([]);
  const [stok, setStok] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState(null);
  const [money, setMoney] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productid = searchParams.get('id');
  
  useEffect(() => {
    const fetchData = async () => {
    try {
        setLoading(true); 
        window.scrollTo(0, 0)       
        const params = new URLSearchParams();
        params.append('id',productid);
        const response = await fetch(`//${serverUrl}/api/product/item.php?${params.toString()}`);
        const jsonData = await response.json();
        setData(jsonData.data);
        setName(jsonData.data.name);
        setDescription(jsonData.data.description);
        setMoney(jsonData.data.money);
        setBanner(jsonData.data.img);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
    };
    fetchData();
    const stoksData = async () => {
      try {
          setLoading(true);        
          const params = new URLSearchParams();
          params.append('me', localStorage.getItem('token'));
          const responses = await fetch(`//${serverUrl}/api/stoks/get_me_stoks.php?${params.toString()}`);
          const jsonTrans = await responses.json();
          setStoks(jsonTrans.data);
      } catch (error) {
         // showModalWithText(error.message);
      } finally {
          setLoading(false);
      }
      };
      stoksData();
    // eslint-disable-next-line
}, []); // Пустой массив зависимостей

    const nameHandler = (event) => {
      setName(event.target.value);
    };
    const descriptionHandler = (event) => {
      setDescription(event.target.value);
    };
    const moneyHandler = (event) => {
      setMoney(event.target.value);
    };

    const stoksHandler = (event) => {
      setStok(event.target.value);
  };

    const submitHandler = (event) => {
      event.preventDefault();
      Edit_Prodo();
    };

    async function Edit_Prodo() {
      try {
          const params = new URLSearchParams();
          params.append('prodo', productid);
          params.append('name', name);
          params.append('description', description);
          params.append('banner', banner);
          params.append('money', money);
          params.append('stok', stok);
          params.append('me', localStorage.getItem('token'));
          const response = await fetch(`//${serverUrl}/api/product/edit.php?${params.toString()}`);
          const jsonData = await response.json();
          if(jsonData.status){
          }
      } catch (error) {
          console.log(error);
      } finally{
      }
      };

    return (
      <>
       <Header />
        <main className='profile pay'>
        <div className='w250'>
        <Link className='bt' to='/profile/postav/prodo'>Вернуться назад</Link>
        </div>
        <div className='page'>
            <h3>РЕДАКТИРОВАНИЕ ТОВАРА</h3>
            {loading ? ( <> Загрузка </> ) : (
                      <>
                      <h3>Текстовые данные</h3>
                      <form onSubmit={submitHandler}>
                        <div className='duo start'>
                          <div>
                              <p>Название товара</p>
                              <input type="text" defaultValue={data.name} onChange={nameHandler} />
                              <p>Стоимость товара</p>
                              <input  defaultValue={data.money} type="number" onChange={moneyHandler} />
                              <select onChange={stoksHandler}>
                                <option value="">Не указано</option>
                                   {
                                    stoks.map((item) => (
                                      <option key={item.id} value={item.id}>{item.name}</option>
                                    ))
                                    }
                              </select>
                          </div>
                          <div>
                              <p>Описание товара</p>
                              <textarea  defaultValue={data.description} onChange={descriptionHandler}></textarea>
                              <button>Сохранить изменения</button>
                              <button className='red' type='reset'>Сбросить изменения</button>
                          </div>
                          </div>
                          </form>
                          <LoadImages id={productid} bannerImage={banner} />
                        </>
                     )
                }
            </div>
        </main>
        <Footer />
        </>
    )
  }
  
  