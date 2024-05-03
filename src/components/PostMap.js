import React, { useState } from 'react';
import serverUrl from "../config";

export default function PostMap({ onButtonClick }) {
    const [rad, setRad] = useState(1000);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const submitHandler = (event) => {
        event.preventDefault();
        fetchData()
    }
    const radHandler = (event) => {
        setRad(event.target.value);
    };
    
    const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        try {
          setLoading(true);        
          const params = new URLSearchParams();
          params.append('lat', position.coords.latitude);
          params.append('lon',position.coords.longitude);
          params.append('rad',rad);
          const response = await fetch(`//${serverUrl}/api/tools/postmap.php?${params.toString()}`);
          const jsonData = await response.json();
          setData(jsonData.data);
          window.scrollTo(0, 0);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      },
      function (error) {
        console.error("Ошибка получения местоположения:", error);
      }
    );}
    const handleButtonClick = (index, address) => {
        onButtonClick(index, address);
        alert(`Указана новое почтовое отделение: ${address}`);
    };

  return (
    <>
    <div>
        <form className='radform' onSubmit={submitHandler}>
            <p className="mini>В радиусе от вас будет совершён поиск ближайших почтовых отделений</p>
            <input onChange={radHandler} placeholder='Выберите радиус, в котором есть ваш почтовый пункт' type="number" name="rad" defaultValue="1000" />
            <p className="mini">При нажатии кнопки "Обновить список", нами будет получено ваше местоположение</p>
            <button>Обновить</button>
        </form>
    </div>
      <div className='postlist'>
        {loading ? (
          <> 
          <p className='noauth'>Заашрузка ближайших отделений</p>
          </>
        ) : (
          <>
            {data.map((item) => (
              <div className='cart' key={item.id}>
                <p className='mini'>Адрес</p>
                <p>{item.value} {item.unrestricted_value}</p>
                <p className='mini'>Часы работы</p>
                <ul>
                  {item.data.schedule_mon ? (<li>Понедельник: {item.data.schedule_mon}</li>) : null}
                  {item.data.schedule_tue ? (<li>Вторник: {item.data.schedule_tue}</li>) : null}
                  {item.data.schedule_wed ? (<li>Среда: {item.data.schedule_wed}</li>) : null}
                  {item.data.schedule_thu ? (<li>Четверг: {item.data.schedule_thu}</li>) : null}
                  {item.data.schedule_fri ? (<li>Пятница: {item.data.schedule_fri}</li>) : null}
                  {item.data.schedule_sat ? (<li>Суббота: {item.data.schedule_sat}</li>) : null}
                  {item.data.schedule_sun ? (<li>Воскресенье: {item.data.schedule_sun}</li>) : null}
                </ul>
                <button onClick={() => { handleButtonClick(item.value, item.unrestricted_value) }}>Выбрать</button>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
