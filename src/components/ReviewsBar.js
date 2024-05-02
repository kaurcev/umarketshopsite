import React, { useState, useEffect } from 'react';
import serverUrl from "../config";

export default function ReviewsBar(productid) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true); 
            const params = new URLSearchParams();
            params.append('product', productid);       
            const responses = await fetch(`//${serverUrl}/api/review/all.php?${params.toString()}`);
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

    return (
        <>
            {loading ? (
                <>
                    Загрузка
                </>
            ) : (
                <>
                {
                    data.length < 1 ? (
                        <>
                        <p className='noauth'>Отзывов пока нет</p>
                        </>
                    ) : (
                    <>
                    {
                        data.map((item) => (        
                            <div className='review' key={item.id}>
                                <h5>{item.username}</h5>
                                <p>{item.message}</p>
                                <p>{item.date}</p>
                            </div>
                        ))
                    }
                    </>)
                }
                </>
            )
            }
          </>
    );
}