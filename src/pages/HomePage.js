import React, { useEffect } from 'react';
import Header from '../components/Header';

export default function HomePage() {
    document.title = "Главная";
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
        <Header />
            <main>
                <h1>юМаркет Шоп</h1>
                <p>
                    Данный сайт находится на этапе разработки
                </p>
            </main>
        </>
    )
  }
  