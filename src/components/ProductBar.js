import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from "../config";
import '../styles/header.css';
import ProductBarloader from './ProductBarloader';
import ModalAlert from '../components/ModalAlert';

export default function ProductBar() {
    
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [basketadd, setBasketadd] = useState(false);

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



      async function FromBasket(id) {
        try {
            setBasketadd(true);  
            const params = new URLSearchParams();
            params.append('product', id);
            params.append('me', localStorage.getItem('token'));
            const responses = await fetch(`//${serverUrl}/api/basket/add.php?${params.toString()}`);
            const jsonTrans = await responses.json();
            if(jsonTrans.status){
                showModalWithText("Добавлено");
            }else{
                showModalWithText("Ошибка при добавлении товара в корзину :(");
            }
        } catch (error) {
            showModalWithText(error.message)
        } finally {
            setBasketadd(false);
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
                            <img src={`//${serverUrl}/img/${item.img}`} alt={item.name}/>
                            {item.stokpercent === null ? (<>
                                <p className='money'>{item.money}₽</p>
                        </>) : (<>
                        <div className='moneybar'>
                            <p className='money'>{item.oldmoney}₽</p>
                            <span className='stokpercent'>{item.stokpercent}%</span>
                        </div>
                        </>)}
                       
                        <h5>{item.name}</h5>
                        <p className='desc mini'>{item.description}</p>
                       <button className='o' onClick={() => openprodo(item.id)}>Подробнее</button>
                       {localStorage.getItem('token') === null ? (
                            <>
                            <p className='noauth mini'>Авторизируйтесь</p>
                            </>) : (
                            <>
                            {
                                basketadd ? (
                                    <button disabled><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></button>
                                ) : (
                                    <button onClick={() => FromBasket(item.id)}>В корзину</button>
                                )
                            }
                            </>)}
                       
                    </div>
                ))
            )
            }
             <div className='productcart fill'></div>
          </>
    );
}