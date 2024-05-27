import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { serverUrl } from "../../config";
import { getBrowser, getDevice } from "../../functions";
import Header from '../../components/Header';
import '../../styles/profile.css';
import Footer from '../../components/Footer';
import NoAuthPage from "../NoAuthPage";


export default function PaysTran() {
    document.title = "Профиль | Покупки и доставка";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                params.append("me", localStorage.getItem('token'));
                const responses = await fetch(
                    `//${serverUrl}/api/pay/user.php?${params.toString()}`
                );
                const jsonTrans = await responses.json();
                setData(jsonTrans.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, []); // Пустой массив зависимостей

    const usertrue = async (id) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append("id", id);
            params.append("me", localStorage.getItem('token'));
            const responses = await fetch(
                `//${serverUrl}/api/pay/usertrue.php?${params.toString()}`
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
                    <p className='mini'>Как осуществляется контроль</p>
                    <p>Чтобы сделка прошла успешно, ведётся двухсторонний контроль: согласие двух сторон о успешной сделке.</p>
                    <p>В каких случаях <span className='reds'>НЕ СТОИТ</span> подтверждать получение товара</p>
                    <ul>
                        <li>
                            <p>Если товар не был отправлен (невалидный трекеркод)</p>
                            <p className='mini'>Пишите жалобу на заказываемый товар, описывая детали сделки</p>
                        </li>
                        <li>
                            Если товар не соответствует заявленым описаниям
                            <p className='mini'>Пишите жалобу на странице товара, а так же укажите отзыв для других участников маркетплейса</p>
                        </li>
                    </ul>
                    <h4>Тут показаны все совершённые Вами покупки</h4>
                    <div className="reviews">
                        {data.map((item) => (
                            <div className="review" key={item.id}>
                                <h4>Тикет №{item.id}</h4>
                                <p className='mini'>Стоимость</p>
                                <p>{item.money}</p>
                                <button onClick={() => navigate(`/product?id=${item.product}`)} className='o'>Открыть товар</button>
                                {item.status !== "0" ? (<>
                                    <p>Сделка прошла успешно.</p>
                                    <button className='o'>Написать отзыв</button>
                                </>) : (<>
                                    {item.status_user === "1" ? (<>
                                        <p>Вы подтвердили получение товара</p>
                                        <button onClick={() => navigate(`/product?id=${item.product}`)} className='o'>Написать жалобу</button>
                                    </>) : (<>
                                        <p className='mini'>Статус отправки</p>
                                        {item.tackercode !== null ? (<>
                                            <p>Поставщик приложил трекер-код: {item.tackercode}</p>
                                            <div className='duo'>
                                                <button onClick={() => usertrue(item.id)}>Подтвердить получение</button>
                                                <button onClick={() => navigate(`/product?id=${item.product}`)} className='o'>Написать жалобу</button>
                                            </div>
                                        </>) : (<>
                                            <p>Ожидание отправки товара</p>
                                        </>)}
                                    </>)}
                                    <p className='mini'>{item.status_postav === "0" ? (<>Поставщик ещё не отметил согласия на удачную сделку.</>) : (<>Этот текст пропадёт, когда транкзакцию подтвердят</>)}</p>
                                </>)}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
