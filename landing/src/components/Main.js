import React from "react";
import appscreen from '../img/app.png'
import phone from '../img/phone.png'
import phone2 from '../img/phone2.png'
import google from '../img/google.png'
import yandex from '../img/yandex.png'
import apipage from '../img/api.png';
import bugspage from '../img/bugs.png';
import vk from '../img/vk.png';
import tg from '../img/tg.png';

import cloudflare from '../logos/cloudflare.png';
import figma from '../logos/figma.png';
import googleamali from '../logos/googleamali.png';
import Mysql from '../logos/Mysql.png';
import netlify from '../logos/netlify.png';
import php from '../logos/php.png';
import phpmeadmin from '../logos/phpmeadmin.png';
import postman from '../logos/postman.png';
import react from '../logos/react.png';
import sweb from '../logos/sweb.png';
import vkwork from '../logos/vkwork.png';
import vsc from '../logos/vsc.png';
import yandexM from '../logos/yandexM.png';
import ЮMoney from '../logos/ЮMoney.png';


export default function Welcome() {
    return (
        <main>
            <div class="page" id="about">
                <div class="cont">
                    <h1>юМаркет Шоп</h1>
                    <p>Платформа электронной коммерции</p>
                    <a class="bt" href="//app.umarketshop.site">Начать пользоваться</a>
                </div>
                <img src={appscreen} alt="" />
            </div>
            <div class="page">
                <div class="cont">
                    <h3>Используемые технологии</h3>
                    <p>Технологии, сервисы и языки программирования, которые используются для работы платформы</p>
                </div>
                <div class="grid">
                    <img src={cloudflare} alt="" />
                    <img src={figma} alt="" />
                    <img src={googleamali} alt="" />
                    <img src={Mysql} alt="" />
                    <img src={netlify} alt="" />
                    <img src={php} alt="" />
                    <img src={phpmeadmin} alt="" />
                    <img src={postman} alt="" />
                    <img src={react} alt="" />
                    <img src={sweb} alt="" />
                    <img src={vkwork} alt="" />
                    <img src={vsc} alt="" />
                    <img src={yandexM} alt="" />
                    <img src={ЮMoney} alt="" />
                </div>
            </div>
            <div class="page" id="api">
                <div class="cont">
                    <h3>API юМаркет Шоп</h3>
                    <p>Система основана на технологии REST API, что позволяет дать публичное API для интеграции площадки на собственные сайты или приложения.</p>
                    <p>Чтобы ознакомиться с документацией перейдите на <a href="//api.umarketshop.site">api.umarketshop.site</a></p>
                    <a class="bt" href="//api.umarketshop.site">Перейти</a>
                </div>
                <img src={apipage} alt="" />
            </div>

            <div class="page" id="bugs">
                <div class="cont">
                    <h3>Баг-трекер юМаркет Шоп</h3>
                    <p>Платформа оснащена отделом тестирования.</p>
                    <p>Пользователи могут получить специальную роль <b>тестировщик</b>, что позволяет им получить доступ к баг-трекеру.</p>
                    <p>Там тестировщики пишут о найденых багах и неточностях в системе.</p>
                    <a class="bt" href="//bugs.umarketshop.site">Перейти</a>
                </div>
                <img src={bugspage} alt="" />
            </div>

            <div class="page">
                <div class="cont">
                    <h2>Интеграция в социальные сети</h2>
                </div>
                <img src={vk} alt="" />
                <img src={tg} alt="" />
            </div>

            <div class="page">
                <div class="cont">
                    <h2>Адаптация под мобильные устройства</h2>
                </div>
                <img src={phone} alt="" />
                <img src={phone2} alt="" />
            </div>

            <div class="page">
                <div class="cont">
                    <h2>Контроль и анализ взаймодействия посетителей с платформой</h2>
                </div>
                <img src={google} alt="" />
                <img src={yandex} alt="" />
            </div>
        </main>
    );
}
