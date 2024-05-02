import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductBar from '../components/ProductBar';
import StoksBar from '../components/StoksBar';
import Footer from '../components/Footer';


export default function HomePage() {
    document.title = "Главная";
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
        <Header />
            <main>
                <div className='stoksbar'>
                    <StoksBar />
                </div>
                <h3>Эксклюзив юМаркет Шоп</h3>
                <div className='productbar'>
                    <ProductBar />
                </div>
            </main>
            <Footer />
        </>
    )
  }
  