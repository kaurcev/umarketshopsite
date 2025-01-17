import React, { useEffect, useState } from "react";
import { serverUrl } from '../config';
import logo from '../img/logo.png';

export default function Header() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [infoload, setInfoload] = useState(false);

    const getToken = () => {
        // eslint-disable-next-line
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        return token;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                params.append('me', getToken());
                const responses = await fetch(`//${serverUrl}/getinformation?${params.toString()}`);
                const jsonTrans = await responses.json();
                setData(jsonTrans.data);
                if (!jsonTrans.status) {
                    setInfoload(true);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        if (getToken() !== null) {
            fetchData();
        }
        // eslint-disable-next-line
    }, []); // Пустой массив зависимостей


    return (
        <>
            <header>
                <div className="header">
                    <div>
                        <img className="logo" alt="uMarket Shop" src={logo} /><span>Баг-трекер</span>
                    </div>
                    <div>
                        {infoload ? (<>
                            <a className="bt" href="//app.umarketshop.site/auth">Войти</a>
                        </>) : (<>
                            <span>{data.username}</span>
                            <a className="bt" href="//app.umarketshop.site/">Вернуться в систему</a>
                        </>)}
                    </div>
                </div>
            </header>
            <main>
                {
                    infoload ? (<>Чтобы выйти в систему, нужно нажать на кнопку " Авторизироваться в системе юМаркет Шопа" на этой <a href="//app.umarketshop.site/auth">странице</a></>) : (<>
                        {
                            loading ? (
                                <>
                                    Загрузка
                                </>
                            ) : (
                                <>
                                    <h1>Баг-трекер</h1>
                                    {
                                        data.roleid === "4" ? (<>
                                            <p>На данный момент этот раздел находится в разработке.</p>
                                            <a href="https://forms.yandex.ru/u/664c6220eb6146de10b7cd7b/">Перейдите по ссылке для сдачи отчёта</a>
                                        </>) : (<>
                                            <p> Чтобы давать отчёты, необходмо получить роль тестировщика.</p>
                                            <p>На данный момент вы имеете роль <b>{data.role}</b></p>
                                        </>)
                                    }
                                </>
                            )
                        }
                    </>)
                }
            </main>
        </>
    );
}
