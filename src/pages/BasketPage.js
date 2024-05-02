import React, { useEffect, useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import Header from "../components/Header";
import serverUrl from "../config";
import Footer from '../components/Footer';

export default function BasketPage() {
  document.title = "Ваша корзина";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
      const fetchData = async () => {
      try {
          setLoading(true);       
          const params = new URLSearchParams();
          params.append('me', localStorage.getItem('token')); 
          const responses = await fetch(`//${serverUrl}/api/basket/me_basket.php?${params.toString()}`);
          const jsonTrans = await responses.json();
          setData(jsonTrans.data);
      } catch (error) {
          console.log(error);
      } finally {
          setLoading(false);
      }
      };
      fetchData();
      // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  const dropbasket = async (id) => {
    try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('id', id);
        params.append('me', localStorage.getItem('token'));
        const response = await fetch(`//${serverUrl}/api/basket/delete.php?${params.toString()}`);
        const jsonData = await response.json();
        if(jsonData.status){
            // alert("Удалено");
            setData(prevData => prevData.filter(item => item.id !== id));
        }
    } catch (error) {
        console.log(error);
    } finally{
        setLoading(false);
    }
    };

    const openprodo = async (id) => {
      navigate(`/product?id=${id}`);
    }; 


    return (
      <>
      <Header />
        <main className='profile pay'>
        <div className='w250'>
        <Link className='bt' to='/'>На главную</Link>
        </div>
        <div className='page'>
            {loading ? (
                <>
                Загрузка
                </>
            ) : (
                <>
                    <h4>Ваша корзина</h4>
                    <p className='mini'>Это ваша корзина. Тут отображаются товары. которые вы добавили в корзину</p>
                    <div className='productbar'>
            {loading ? (
                <>
                    Загрузка
                </>
            ) : (
                data.map((item) => (        
                    <div className='productcart' key={item.id}>
                      <img src={`//${serverUrl}/img/${item.img}`} alt={item.name} />
                      <h5>{item.name}</h5>
                        <p className='desc mini'>{item.description}</p>  
                        <button className='o' onClick={() => openprodo(item.product_id)}>Открыть товар</button>
                        <button className='red' onClick={() => dropbasket(item.id)}>Удалить из корзины</button>     
                    </div>
                ))
            )
            }
          </div>
                </>
            )}
             </div> 
        </main>
        <Footer />
      </>
    )
  }
  