import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import E404 from '../img/E404.png'
import Footer from '../components/Footer';

export default function PaySuccessPage() {
    document.title = "404 - Страница не найдена";
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
        <main className='centered'>
            <img src={E404} alt='404' />
            <h1>Платёж принят!</h1>
            <p>Скоро ваши средства поступят на ваш счёт</p>
            <p><Link className='bt' to='/profile/wallet'>Вернуться в кошелёк</Link></p>
        </main>
        <Footer />
        </>
    )
  }
  