import React, { useState, useEffect } from 'react';
import { serverUrl } from "../config";
import '../styles/ReviewBar.css';

const ProdImgBar = ({ id }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true); 
            const params = new URLSearchParams();
            params.append('id', id);       
            const responses = await fetch(`//${serverUrl}/api/product/images.php?${params.toString()}`);
            const jsonTrans = await responses.json();
            setData(jsonTrans.data); 
            setImg(`//${serverUrl}/img/${jsonTrans.data[0].photo}`)
        } catch (error) {
            setData([{id : "1",username : "Система юМаркет Шоп", message : `При загрузке данных произошла ошибка: ${error.message}.`}]);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
        // eslint-disable-next-line
    }, []); // Пустой массив зависимостей
    const imageopen = (image) =>{
        setImg(image);
    }
    if (!id) return null;
    return (
        <>
        <div className='imagebar'>
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
                    {
                        data.map((item) => (
                           <img key={item.num} className='miniimage' onClick={() => imageopen(`//${serverUrl}/img/${item.photo}`) } src={`//${serverUrl}/img/${item.photo}`} alt={item.prod}/>
                        ))
                    }
                </>
            )
            }
        </div>
        <div className='imgback' style={{backgroundImage: `url("${img}")`}} >
            <img src={img} className="preview" alt={data.name} />
        </div>
        </>
    );
}

export default ProdImgBar;
