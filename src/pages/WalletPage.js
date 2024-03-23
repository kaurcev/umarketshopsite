import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import serverUrl from "../config";
import Header from '../components/Header';
import '../styles/profile.css';
import yoomoney from '../img/iomoney.svg'

export default function WalletPage() {
    document.title = "Профиль";
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [trans, setTrans] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);        
            const params = new URLSearchParams();
            params.append('me', localStorage.getItem('token'));
            const response = await fetch(`//${serverUrl}/api/user/getinfo.php?${params.toString()}`);
            const jsonData = await response.json();
            setData(jsonData.data);
            if(!jsonData.status){
                navigate('/logout')
            }
            const paramso = new URLSearchParams();
            paramso.append('me', localStorage.getItem('token'));
            const responses = await fetch(`//${serverUrl}/api/user/gettrans.php?${params.toString()}`);
            const jsonTrans = await responses.json();
            setTrans(jsonTrans.data);
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
        <Header />
        <main className='profile pay'>
        <div className='w250'>
        <Link className='bt' to='/profile'>Вернуться назад</Link>
        </div>
        <div className='page'>
            {loading ? (
                <>
                Загрузка
                </>
            ) : (
                <>
                    <h4>ВАШ КОШЕЛЁК</h4>
                    <p className='mini'>Ваши  средства будут храниться в юМаркет Шоп</p>
                    <div className='cartpanel'>
                        <h2>{data.wallet}Р</h2>
                        <div className='bank'> 
                        <span className='mini'>Интеграция с </span> <img src={yoomoney} alt="" />
                      </div> 
                    </div>
                    <h4>ПОПОЛНЕНИЕ</h4>
                    <form className='pay' method="POST" action="https://yoomoney.ru/quickpay/confirm">
                      <input type="hidden" name="receiver" value="4100110853907883"/>
                      <input type="hidden" name="label" defaultValue={data.username} />
                      <input type="hidden" name="quickpay-form" value="button"/>
                      <p className='mini'>Сумма поплнения</p>
                      <input type='number' name="sum" defaultValue="2" data-type="number"/>
                      <p className='mini'>ЮMoney не берёт коммисию. Её может взять банк</p>
                      <input type="hidden" name="successURL" value="https://umarketshop.site/pay/success"/>
                      <h4>Способ пополнения</h4>
                      <div className='duo'>
                        <label><input type="radio" name="paymentType" value="PC"/>ЮMoney</label>
                        <label><input type="radio" name="paymentType" value="AC"/>Банковская карта</label>
                      </div>
                      <button>Пополнить</button>
                  </form>
                </>
            )}
            <h4>ПОСЛЕДНИЕ ОПЕРАЦИИ</h4>
              <div className='payslist'>
              {loading ? (
            <>
            Загрузка
            </>
          ) : (
            trans.map((item) => (        
                <div className='itempay' key={item.id}>
                  <span className='big'>{item.money}Р</span>
                    <div className='info'>
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                        <p className='mini'>Дата и время операции: {item.date}</p>
                    </div>
                </div>
            ))
          )}

              </div>
         </div>
        </main>
        </>
    )
  }
  