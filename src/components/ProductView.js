import React, { useState, useEffect } from 'react';
import serverUrl from "../config";
import { useNavigate } from 'react-router-dom';
import ModalAlert from './ModalAlert';
import '../styles/ProductView.css';
const ProductView = ({ id }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [basketadd, setBasketadd] = useState(false);

    // Для отображения модального окна
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');
    
    const showModalWithText = (text) => {
        setModalText(text); // Устанавливаем текст для модального окна
        setShowModal(true); // Показываем модальное окно
        setTimeout(() => {
        setShowModal(false); // Автоматически скрываем модальное окно через 3 секунды
        }, 1500);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
        try {
            setLoading(true);        
            const params = new URLSearchParams();
            params.append('id', id);
            const responses = await fetch(`//${serverUrl}/product?${params.toString()}`);
            const JsonData = await responses.json();
            setData(JsonData.data); 
            document.title = JsonData.data.name;
        } catch (error) {
            showModalWithText(error.message)
        } finally {
            setLoading(false);
        }
        };
        fetchData();
        // eslint-disable-next-line
    }, []); // Пустой массив зависимостей

    async function FromBasket() {
    try {
        setBasketadd(true);  
        const params = new URLSearchParams();
        params.append('product', id);
        params.append('me', localStorage.getItem('token'));
        const responses = await fetch(`//${serverUrl}/api/basket/add.php?${params.toString()}`);
        const jsonTrans = await responses.json();
        if(jsonTrans.status){
            showModalWithText("Добавлено");
        }else{
            showModalWithText("Ошибка при добавлении товара в корзину :(");
        }
    } catch (error) {
        showModalWithText(error.message)
    } finally {
        setBasketadd(false);
    }
    };

    const share = () =>{
        navigator.clipboard.writeText(`Посмотрите на ${data.name} по ссылке ${window.location.href} на юМаркет Шоп!`)
        .then(() => console.log("Done!"))
        .catch(err => console.error(err))
        showModalWithText("Ссылка скопирована");
    }

    if (!id) return null;
    return (
        <>
         <ModalAlert show={showModal} onClose={() => setShowModal(false)} text={modalText} />
            {loading ? (                <>
                <h1> 
                    <span onClick={() => navigate(-1)}>
                        <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
                    </span><div className='skelet-loader h1'>
                        
                    </div></h1>
                    <hr />
                    <div className='duob'>
                        <div className='linkpanel'>
                            <div className='skelet-loader span'></div>
                        </div>
                        <span className='mini'>
                            <div className='skelet-loader span'></div>
                        </span>
                    </div>
                    <div className='duo'>
                        <img className='skelet-loader' src="#" alt="" />
                    <div className='dop'>
                        <>
                        <div className='moneycart'>
                        <div className='skelet-loader h1'></div>
                       </div>
                       <button className='skelet-loader'></button>
                        <div className='postavprofile'>
                            <p className='mini'>Связаться с поставщиком</p>
                            <div className='skelet-loader p'></div>
                            <div className='skelet-loader p'></div>
                            <div className='skelet-loader p'></div>
                            <p className='mini'>Адрес отправки</p>
                            <div className='skelet-loader p'></div>
                        </div>
                        </>
                        </div>
                    </div>
                    <h4>Полное название</h4>
                    <div className='skelet-loader p'></div>
                    <h4>Описание</h4>
                    <div className='skelet-loader p'></div>
                    <div className='skelet-loader p'></div>
                    <div className='skelet-loader p'></div>
                    <div className='skelet-loader p'></div>
                    <div className='skelet-loader p'></div>
                </>) : (
                <>
                <h1> 
                    <span onClick={() => navigate(-1)}>
                        <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
                    </span>{data.name}</h1>
                    <hr />
                    <div className='duob'>
                        <div className='linkpanel'>
                        <span onClick={() => share()}>Поделиться</span>
                        </div>
                        <span className='mini'>
                        Артикул: {data.id}
                        </span>
                    </div>
                    <div className='duo'>
                        <div className='imgback' style={{backgroundImage: `url("//${serverUrl}/img/${data.img}")`}} >
                        <img src={`//${serverUrl}/img/${data.img}`} alt={data.name} />
                        </div>
                    <div className='dop'>
                        <>
                        <div className='moneycart'>
                        <p className='money'>{data.money} ₽</p>
                        {
                        localStorage.getItem('token') === null ? (
                        <>
                        <p className='noauth'>Необходимо авторизироваться</p>
                        </>) : (
                            <>
                            {
                                basketadd ? (
                                    <button disabled><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></button>
                                ) : (
                                    <button onClick={() => FromBasket()}>В корзину</button>
                                )
                            }
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
                    <pre>{data.description}</pre>
                </>
            )
        }
        </>
    );
}

export default ProductView;