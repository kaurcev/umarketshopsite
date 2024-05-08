import React from 'react';
import { Link, } from 'react-router-dom';
import logo from '../img/logo.png'

import '../styles/footer.css';

export default function Footer() {


    return (
        <>
          <footer>
            <div className='footer'>
                <img className='logo' src={logo} alt="юМаркет Шоп"/>
               <div>
               <Link href='mailto:info@umarketshop.site'>info@umarketshop.site</Link>
               <p className='mini'>Александр Каурцев - Курсовой проект "юМаркет Шоп"</p>
               <h1>Ударным темпом деплоится хуйня!</h1>
               <h1>СПРИНТ ЗАКРОЕМ ЗА 4 ДНЯ!</h1>
               </div>
            </div>
          </footer>
          </>
    );
}