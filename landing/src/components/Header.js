import React, { useEffect, useState } from "react";
import { serverUrl } from '../config';
import logo from '../img/logo.png';

export default function Header() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

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
                    {loading}
                    <div>
                        <img className="logo" alt="uMarket Shop" src={logo} />
                    </div>
                    <div>
                        {
                            data.username !== "" ? (<>
                                <a className="bt" href="//app.umarketshop.site/">Войти</a>
                            </>) : (<>
                                <span>{data.username}</span>
                                <a className="bt" href="//app.umarketshop.site/">Перейти</a>
                            </>)
                        }
                    </div>
                </div>
            </header>
        </>
    );
}
