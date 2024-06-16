import React from "react";
import logo from '../img/logo.png';

export default function Header() {
    return (
        <>
            <header>
                <div class="header">
                    <nav>
                        <img class="logo" src={logo} alt="#" />
                        <a href="#about">О проекте</a>
                        <a href="#api">API</a>
                        <a href="#bugs">Баг-трекер</a>
                        <a href="//app.umarketshop.site/privacy">Политика конфиденциальности</a>
                        <a href="//app.umarketshop.site/use-terms">Правила использования</a>
                    </nav>
                    <button>Перейти</button>
                </div>
            </header>
        </>
    );
}
