import React, { useEffect, useState } from 'react';
import serverUrl from "../config";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReviewsBar from '../components/ReviewsBar';
import FormAddRew from '../components/FormAddRew';

export default function ProductPage() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productid = searchParams.get('id');


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
        try {
            setLoading(true);        
            const params = new URLSearchParams();
            params.append('id', productid);
            const responses = await fetch(`//${serverUrl}/api/product/item.php?${params.toString()}`);
            const JsonData = await responses.json();
            setData(JsonData.data); 
            document.title = JsonData.data.name;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
        // eslint-disable-next-line
    }, []); // Пустой массив зависимостей

    async function FromBasket() {
        try {
            const params = new URLSearchParams();
            params.append('product', productid);
            params.append('me', localStorage.getItem('token'));
            const response = await fetch(`//${serverUrl}/api/basket/add.php?${params.toString()}`);
            const jsonData = await response.json();
            if(jsonData.status){
                alert("Добавлено");
            }
        } catch (error) {
            console.log(error);
        } 
        };

    return (
        <>
        <Header />
            <main className='productpage'>
                { loading ? (
                    <>
                    Загрузка
                    </>
                ) : (
                    <>
                    <h1> 
                        <span onClick={() => navigate(-1)}>
                            <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
                        </span>
                    {data.name}</h1>
                        <hr />
                        <div className='duob'>
                            <div className='linkpanel'>
                            <Link to="#">Поделиться</Link>
                            </div>
                            <span className='mini'>
                            Артикул: {data.id}
                            </span>
                        </div>
                        <div className='duo'>
                            <img src={`//${serverUrl}/img/${data.img}`} alt={data.name} />
                        <div className='dop'>
                            <>
                            <div className='moneycart'>
                            <p className='money'>{data.money} ₽</p>
                            {
                            localStorage.getItem('token') === null ? (
                            <>
                            Необходимо авторизироваться
                            </>) : (
                                <>
                                 <button onClick={() => FromBasket()}>В корзину</button>
                                </>
                            )
                            }
                           </div>
                           <button>Купить в один клик</button>
                            <div className='postavprofile'>
                                <p className='mini'>Связаться с поставщиком</p>
                                <p>{data.provider_email}</p>
                                <p>{data.provider_phone}</p>
                                <p>{data.provider_name} {data.provider_firstname}</p>
                                 <p className='mini'>Адрес отправки</p>
                                <p>{data.provider_address}</p>
                            </div>
                            </>
                            </div>
                        </div>
                        <h4>Полное название</h4>
                        <p>{data.name}</p>
                        <h4>Описание</h4>
                        <p>{data.description}</p>
                    </>
                    )
                }
                <h4>Отзывы</h4>
                <div className='reviews'>
                    {ReviewsBar(productid)}
                </div>
                <FormAddRew />
            </main>
            <Footer />
        </>
    )
  }
  