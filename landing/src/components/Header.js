import React from "react";
import logo from '../img/logo.png';

export default function Header() {
    return (
        <>
            <header>
                <div class="header">
                    <nav>
                        <img class="logo" src={logo} alt="#" />
                        <a href="#">О проекте</a>
                        <a href="#">API</a>
                        <a href="#">Баг-трекер</a>
                        <a href="#">Политика конфиденциальности</a>
                        <a href="#">Правила использования</a>
                    </nav>
                    <button>Перейти</button>
                </div>
            </header>
        </>
    );
}
