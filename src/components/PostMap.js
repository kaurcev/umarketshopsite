import React, { useState } from 'react';
import { serverUrl } from "../config";
import ModalAlert from '../components/ModalAlert';

export default function PostMap({ onButtonClick }) {
    const [rad, setRad] = useState(1000);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

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
          showModalWithText(error.message);
        } finally {
          setLoading(false);
        }
      },
      function (error) {
        showModalWithText("Ошибка получения местоположения:", error);
      }
    );}
    const handleButtonClick = (index, address) => {
        onButtonClick(index, address);
        showModalWithText(`Указано новое почтовое отделение: ${address}`);
    };

  return (
    <>
    <ModalAlert show={showModal} onClose={() => setShowModal(false)} text={modalText} />
    <div>
        <form className='radform' onSubmit={submitHandler}>
            <div className="mini">В радиусе от вас будет совершён поиск ближайших почтовых отделений</div>
            <input onChange={radHandler} placeholder='Выберите радиус, в котором есть ваш почтовый пункт' type="number" name="rad" defaultValue="1000" />
            <div className="mini">При нажатии кнопки "Обновить список", нами будет получено ваше местоположение</div>
            <button>Обновить</button>
        </form>
    </div>
      <div className='postlist'>
        {loading ? (
          <> 
          <p className='noauth'>Загрузка ближайших отделений</p>
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
