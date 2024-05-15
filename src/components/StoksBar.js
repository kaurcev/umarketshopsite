import React, { useState, useEffect } from 'react';
import { serverUrl } from "../config";
import '../styles/header.css';
import { useNavigate } from 'react-router-dom';
import ModalAlert from './ModalAlert';

export default function StoksBar() {
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
            const responses = await fetch(`//${serverUrl}/api/stoks/all.php`);
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
            {loading ? (
                <>
                </>
            ) : (
                data.map((item) => (        
                    <div className='stokcart' onClick={() => navigate(`/stock?id=${item.id}`)}  key={item.id}>
                        <div>
                            <h4>{item.name}</h4>
                            <pre>{item.description}</pre>
                            <p>С {item.datecreate} по {item.dateend}</p>
                            <p>{item.provider}</p>
                        </div>
                    </div>
                ))
            )
            }
          </>
    );
}