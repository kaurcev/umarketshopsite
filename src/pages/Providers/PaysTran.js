import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { serverUrl } from "../../config";
import Header from '../../components/Header';
import '../../styles/profile.css';
import Footer from '../../components/Footer';
import NoAuthPage from "../NoAuthPage";


export default function PaysTranPostav() {
    document.title = "Профиль | Покупки и доставка";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [track, setTrack] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append("me", localStorage.getItem('token'));
            const responses = await fetch(
                `//${serverUrl}/api/pay/postav.php?${params.toString()}`
            );
            const jsonTrans = await responses.json();
            setData(jsonTrans.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
        // eslint-disable-next-line
    }, []); // Пустой массив зависимостей

    const trueprovider = async (id) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append("id", id);
            params.append("track", track);
            params.append("me", localStorage.getItem('token'));
            const responses = await fetch(
                `//${serverUrl}/api/pay/postavtrack.php?${params.toString()}`
            );
            const jsonTrans = await responses.json();
            if (jsonTrans.status) {
                alert("Успешно");
                fetchData();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const postavtrue = async (id) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append("id", id);
            params.append("me", localStorage.getItem('token'));
            const responses = await fetch(
                `//${serverUrl}/api/pay/postavtrue.php?${params.toString()}`
            );
            const jsonTrans = await responses.json();
            if (jsonTrans.status) {
                alert("Успешно");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const trackHandler = (event) => {
        setTrack(event.target.value);
    };

    if (!localStorage.getItem('token')) return (<><NoAuthPage /></>);
    return (
        <>
            <Header />
            <main className='profile'>
                <div className='w250'>
                    <Link className="bt" onClick={() => navigate(-1)}>
                        Вернуться назад
                    </Link>
                </div>
                <div className='page'>
                    <h3>{document.title}</h3>
                    <p>Это товары, которые пользователи оплатиили и ждут отправления</p>
                    <div className="reviews">
                        {data.map((item) => (
                            <div className="review" key={item.id}>
                                <h4>Тикет №{item.id}</h4>
                                <p className='mini'>Стоимость товара</p>
                                <p>{item.money}</p>
                                {item.status !== "0" ? (<>
                                    <p>Сделка прошла успешно.</p>
                                </>) : (<>
                                    {item.status_user === "0" ? (<>
                                        <p className='mini'>трекеркод</p>
                                        {
                                            item.tackercode === null ? (<>
                                                <div className='duo'>
                                                    <input onChange={trackHandler} placeholder='Введите тут трекеркод отправки' />
                                                    <button onClick={() => trueprovider(item.id)}>Отправить</button>
                                                </div>
                                            </>) : (<>
                                                <p>{item.tackercode}</p>
                                            </>)}
                                    </>) : (<>
                                        <p>Пользователь подтвердил приём товара</p>
                                        {item.status_postav === "0" ? (<> <button onClick={() => postavtrue(item.id)}>Подтвердить сделку</button><p className='mini'>Подтверждайте только в том случае, если товар был принят</p></>) : null}

                                    </>)}
                                </>)}
                                <button onClick={() => navigate(`/product?id=${item.product}`)} className='o'>Открыть товар</button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
