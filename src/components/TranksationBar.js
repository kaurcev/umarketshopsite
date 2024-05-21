import React, { useState, useEffect } from 'react';
import { serverUrl } from "../config";
import '../styles/header.css';
import ModalAlert from './ModalAlert';

export default function TreanksationBar() {
    const [trans, setTrans] = useState([]);
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
            const responses = await fetch(`//${serverUrl}/transactions?${params.toString()}`);
            const jsonTrans = await responses.json();
            setTrans(jsonTrans.data);
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
         <div className='payslist'>
              {loading ? (
            <>
            <p className='noauth'>
              Загрузка
            </p>
            </>
          ) : (
            <>
            {
              trans.length < 1 ? (
                <>
                    <p className='noauth'>
                Транкзакций не проводилось
                    </p>
                </>
              ) : (
                <>
                {
                  trans.map((item) => (        
                    <div className='itempay' key={item.id}>
                      <span className='big'>{item.money}₽</span>
                        <div className='info'>
                            <h5>{item.name}</h5>
                            <p>{item.description}</p>
                            <p className='mini'>Дата и время операции: {item.date}</p>
                        </div>
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