import React, { useState, useEffect } from 'react';
import serverUrl from "../config";
import '../styles/header.css';

export default function StoksBar() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);        
            const responses = await fetch(`//${serverUrl}/api/stoks/all.php`);
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
                </>
            ) : (
                data.map((item) => (        
                    <div className='stokcart' key={item.id}>
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                        <p>С {item.datecreate} по {item.dateend}</p>
                        <p>{item.provider}</p>
                    </div>
                ))
            )
            }
          </>
    );
}