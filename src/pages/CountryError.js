import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import countryerror from '../img/countryerror.png'
import Footer from '../components/Footer';

export default function CountryError() {
    document.title = "Упс...";
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
        <main className='centered'>
            <img src={countryerror} alt='404' />
            <h1>УПС!</h1>
            <p>К сожалению, мы не работаем на территории вашей страны..</p>
            <p className='mini'>Вы можете связаться с нашей администрацией для решения этого вопроса</p>
            <p><Link className='bt' to='mailto:support@umarketshop.site'>Написать письмо</Link></p>
        </main>
        <Footer />
        </>
    )
  }
  