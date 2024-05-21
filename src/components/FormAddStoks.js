import React, { useState } from 'react';
import { serverUrl } from "../config";
import { useNavigate } from 'react-router-dom';
import ModalAlert from './ModalAlert';

export default function FormAddStoks() {
    document.title = "Добавление акции";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dateend, setDateend] = useState('');
    const [percent, setPercent] = useState('');

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


    async function AddStok() {
      try {
          setLoading(true);
          const params = new URLSearchParams();
          params.append('name', name);
          params.append('descr', description);
          params.append('dateend', dateend);
          params.append('percent', percent);
          params.append('me', localStorage.getItem('token'));
          const response = await fetch(`//${serverUrl}/provider/addstok?${params.toString()}`);
          const jsonData = await response.json();
          if(jsonData.status){
            showModalWithText("Добавлено");
              navigate(-1);
          }
      } catch (error) {
          showModalWithText(error.error);
      } finally{
          setLoading(false);
      }
      };

    const nameHandler = (event) => {
      setName(event.target.value);
    };

    const descHandler = (event) => {
      setDescription(event.target.value);
    };

    const dateendHandler = (event) => {
      setDateend(event.target.value);
    };

    const percentHandler = (event) => {
      setPercent(event.target.value);
    };

    const submitHandler = (event) => {
      event.preventDefault();
      AddStok();
    };

    return (
        <>
        <ModalAlert show={showModal} onClose={() => setShowModal(false)} text={modalText} />
        <form onSubmit={submitHandler}>
            <p className="mini">Название акции</p>
            <input maxLength="50" placeholder='Название акции' type="text" onChange={nameHandler} />
            <p className="mini">Процент скидки на товар</p>
            <input type="num" value={percent}  onChange={percentHandler} />
            <p className="mini">Описание акции</p>
            <textarea maxLength="5000" placeholder='Расскажите о акции' onChange={descHandler} />
            <p className="mini">Дата окончания акции</p>
            <input type="datetime-local" onChange={dateendHandler} />
            <p className="mini">Обратите внимание, что создавемая Вами акция будет отображаться у польззователей в главном меню!</p>
            {loading ? (<p><button disabled><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></button></p>) : 
            (<p><button>Создать акцию</button></p>)}
             <button className='red' type='reset'>Сбросить изменения</button>
        </form>
        </>
    );
}