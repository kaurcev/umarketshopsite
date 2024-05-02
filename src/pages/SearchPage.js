import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import serverUrl from "../config";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SearchPage() {
    document.title = "Результаты поиска";
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);    
            window.scrollTo(0, 0);    
            const params = new URLSearchParams();
            params.append('search', search);
            const responses = await fetch(`//${serverUrl}/api/product/search.php?${params.toString()}`);
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
    }, [search]); // Пустой массив зависимостей

    const openprodo = async (id) => {
        navigate(`/product?id=${id}`);
      };

    return (
        <>
        <Header />
        <main>
            <h4>РЕЗУЛЬТАТЫ ПОИСКА ПО ЗАПРОСУ: "{search}"</h4>
            <div className='productbar'>
                {loading ? (
                    <>
                        Загрузка
                    </>
                ) : (
                    data.map((item) => (        
                        <div className='productcart' key={item.id}>
                            <img src={`//${serverUrl}/img/${item.img}`} alt={item.name} />
                            <p className='money'>{item.money}Р</p>   
                            <h5>{item.name}</h5>
                            <p className='desc mini'>{item.description}</p>
                        <button className='o' onClick={() => openprodo(item.id)}>Подробнее</button>
                        <button>В корзину</button>
                        </div>
                    ))
                )
                }
            </div>
        </main>
        <Footer />
        </>
    )
  }
  