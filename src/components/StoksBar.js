import React, { useState, useEffect } from 'react';
import serverUrl from "../config";
import '../styles/header.css';
import { useNavigate } from 'react-router-dom';
export default function StoksBar() {
    const navigate = useNavigate();
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
                    <div className='stokcart' onClick={() => navigate(`/stock?id=${item.id}`)}  key={item.id}>
                        <div>
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <p>С {item.datecreate} по {item.dateend}</p>
                            <p>{item.provider}</p>
                        </div>
                    </div>
                ))
            )
            }
          </>
    );
}