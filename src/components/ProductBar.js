import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import serverUrl from "../config";
import '../styles/header.css';

export default function ProductBar() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => { 
        try {
            setLoading(true);        
            const responses = await fetch(`//${serverUrl}/api/product/all.php`);
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

    const openprodo = async (id) => {
        navigate(`/product?id=${id}`);
      }; 



      const FromBasket = async (id) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append('product', id);
            params.append('me', localStorage.getItem('token'));
            const response = await fetch(`//${serverUrl}/api/basket/add.php?${params.toString()}`);
            const jsonData = await response.json();
            if(jsonData.status){
                alert("Добавлено");
            }
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
        };

    return (
        <>
            {loading ? (
                <>
                    Загрузка
                </>
            ) : (
                data.map((item) => (        
                    <div className='productcart' key={item.id}>
                        <img src={`//${serverUrl}/img/${item.img}`} alt={item.name} />
                        <p className='money'>{item.money}₽</p>   
                        <h5>{item.name}</h5>
                        <p className='desc mini'>{item.description}</p>
                       <button className='o' onClick={() => openprodo(item.id)}>Подробнее</button>
                       {localStorage.getItem('token') === null ? (
                            <>
                            <p className='mini'>Авторизируйтесь</p>
                            </>) : (
                            <>
                            <button onClick={() => FromBasket(item.id)}>В корзину</button>
                            </>)}
                       
                    </div>
                ))
            )
            }
          </>
    );
}