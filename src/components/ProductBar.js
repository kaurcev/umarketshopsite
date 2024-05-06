import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import serverUrl from "../config";
import '../styles/header.css';
import ProductBarloader from './ProductBarloader';
import ModalAlert from '../components/ModalAlert';

export default function ProductBar() {
    
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

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


    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);        
            const responses = await fetch(`//${serverUrl}/api/product/all.php`);
            const jsonTrans = await responses.json();
            setData(jsonTrans.data);
        } catch (error) {
            showModalWithText(error.message);
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
            const params = new URLSearchParams();
            params.append('product', id);
            params.append('me', localStorage.getItem('token'));
            const response = await fetch(`//${serverUrl}/api/basket/add.php?${params.toString()}`);
            const jsonData = await response.json();
            if(jsonData.status){
                showModalWithText("Добавлено");
            }
        } catch (error) {
            showModalWithText(error.message);
        }
        };

    return (
        <>
         <ModalAlert show={showModal} onClose={() => setShowModal(false)} text={modalText} />
            {loading ? (
                <>
                     <ProductBarloader />
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
                            <p className='noauth mini'>Авторизируйтесь</p>
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