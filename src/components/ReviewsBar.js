import React, { useState, useEffect } from 'react';
import serverUrl from "../config";
import '../styles/ReviewBar.css';

const ReviewsBar = ({ id }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true); 
            const params = new URLSearchParams();
            params.append('product', id);       
            const responses = await fetch(`//${serverUrl}/reviews?${params.toString()}`);
            const jsonTrans = await responses.json();
            setData(jsonTrans.data);
        } catch (error) {
            setData([{id : "1",username : "Система юМаркет Шоп", message : `При загрузке данных произошла ошибка: ${error.message}.`}]);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
        // eslint-disable-next-line
    }, []); // Пустой массив зависимостей
    if (!id) return null;
    return (
        <div className='reviews'>
        <h4>Отзывы</h4>
        <div className='scrool'>
            {loading ? (
                <>
                    <div className='review load'>
                    </div>
                    <div className='review load'>
                    </div>
                    <div className='review load'>
                    </div>
                </>
            ) : (
                <>
                {data.length < 1 ? (<>
                        <p className='noauth'>Отзывов пока нет</p>
                        </>
                    ) : (
                    <>
                    {
                        data.map((item) => (        
                            <div className='review' key={item.id}>
                                <h5>{item.username}</h5>
                                <pre>{item.message}</pre>
                                <p className="mini">{item.date}</p>
                            </div>
                        ))
                    }
                    </>)
                }
                </>
            )
            }
             </div>
         </div>
    );
}

export default ReviewsBar;
