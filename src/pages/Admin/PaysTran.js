import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { serverUrl } from "../../config";
import Header from '../../components/Header';
import '../../styles/profile.css';
import Footer from '../../components/Footer';
import NoAuthPage from "../NoAuthPage";


export default function PaysTranAdmin() {
    document.title = "Панель администратора | ";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append("me", localStorage.getItem('token'));
            const responses = await fetch(
                `//${serverUrl}/api/pay/admin.php?${params.toString()}`
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


    const admintrue = async (id) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append("id", id);
            params.append("me", localStorage.getItem('token'));
            const responses = await fetch(
                `//${serverUrl}/api/pay/admintrue.php?${params.toString()}`
            );
            const jsonTrans = await responses.json();
            if (jsonTrans.status) {
                fetchData();
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
                    <p>Подтверждайте транкзакции</p>
                    <div className="reviews">
                        {loading ? (<>
                        </>) : (<>
                            {data.map((item) => (
                                <div className="review" key={item.id}>
                                    <h4>Тикет №{item.id}</h4>
                                    <p>Средства: {item.money}</p>
                                    {item.status === "1" ? (<>
                                        <p>Сделка прошла успешно</p>
                                    </>) : (<>
                                        <p>Трекеркод: {item.tackercode}</p>
                                        <div className='duo'>
                                            <button className='o'>Профиль поставщика</button>
                                            <button className='o' >Посмотреть товар</button>
                                        </div>
                                        <button onClick={() => admintrue(item.id)}>Подтвердить перевод</button>
                                        {item.status_user !== "0" ? (<><p>Пользователь сделал всё правильно</p></>) : (<>В процессе</>)}
                                        {item.status_postav !== "0" ? (<><p>Поставщик сделал всё правильно</p></>) : (<>В процессе</>)}
                                    </>)}
                                    <p className='mini'>Вы так же можете глянуть <Link to="/profile/admin/complaints">жалобы</Link></p>
                                </div>
                            ))}
                        </>)}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
