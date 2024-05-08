import React, { useState, useEffect } from 'react';
import serverUrl from "../config";
import '../styles/header.css';
import ModalAlert from './ModalAlert';

export default function StoksProvideBar() {
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
            const params = new URLSearchParams();
            params.append('me', localStorage.getItem('token'));
            const responses = await fetch(`//${serverUrl}/api/stoks/get_me_stoks.php?${params.toString()}`);
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

    return (
        <>
         <ModalAlert show={showModal} onClose={() => setShowModal(false)} text={modalText} />
         <div className='stoklist'>
              {loading ? (
            <>
            <p className='noauth'>
              Загрузка
            </p>
            </>
          ) : (
            <>
            {
              data.length < 1 ? (
                <>
                    <p className='noauth'>
                        Акций ещё нет
                    </p>
                </>
              ) : (
                <>
                {
                  data.map((item) => (        
                    <div className='stokitem' key={item.id}>
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <p className='mini'>{item.datecreate} - {item.dateend}</p>
                    </div>
                ))
                }
                </>
              )
            }
            </>
          )}
          
        </div>
          </>
    );
}