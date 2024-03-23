import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import serverUrl from "../config";

export default function E500Page() {
    document.title = "Технические работы";
    const navigate = useNavigate();
    useEffect(() => {
    const getStatus = async () => {
        fetch(`//${serverUrl}/api/status.php`)
        .then(response => response.json())
        .then(data => {
            if(data.status){
                navigate('/')
            }
        })
        .catch(error => {
            // alert(error);
    });
    }
    getStatus();
    // eslint-disable-next-line
    }, []); // Пустой массив зависимостей
    return (
        <>
        <main className='centered'>
            <h1>505</h1>
            <p>Сервер ответил 500 ошибкой</p>
            <p>Перезагрузите страницу или попробуйте зайти чуть позже.</p>
            <p className='mini'>Если данная ошибка не пропала по истечению длительного строка, напишите нам на info@umarketshop.site</p>
        </main>
        </>
    )
  }
  