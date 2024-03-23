import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function E404Page() {
    document.title = "404 - Страница не найдена";
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
        <main className='centered'>
            <h1>404</h1>
            <p>Страница не найдена</p>
            <p><Link className='bt' to='/'>Вернуться на главную</Link></p>
        </main>
        </>
    )
  }
  