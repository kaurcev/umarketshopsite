import React from "react";
import appscreen from '../img/app.png'

export default function Welcome() {
    return (
        <div className="welcome">
            <h1>Добро пожаловать на юМаркет Шоп!</h1>
            <p>юМаркет Шоп - платформа электронной коммерции</p>
            <img alt="app.umarketshop.site" src={appscreen} />
        </div>
    );
}
