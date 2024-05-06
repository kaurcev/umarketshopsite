import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import serverUrl from "../config";
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModalAlert from '../components/ModalAlert';

export default function PostavEditPage() {
  document.title = "Панель поставщика | Редактирование";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [prodo, SetProdo] = useState('');

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
      const fetchData = async () => {
      try {
          setLoading(true); 
          window.scrollTo(0, 0)       
          const params = new URLSearchParams();
          params.append('me', localStorage.getItem('token'));
          const response = await fetch(`//${serverUrl}/api/provider/meprovider.php?${params.toString()}`);
          const jsonData = await response.json();
          setData(jsonData.data);
          setName(jsonData.data.name);
          setDescription(jsonData.data.description);
          SetProdo(jsonData.data.prodo);
      } catch (error) {
            showModalWithText(error.message);
      } finally {
          setLoading(false);
      }
      };
      fetchData();
      // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

    const nameHandler = (event) => {
        setName(event.target.value);
    };
    const descriptionHandler = (event) => {
        setDescription(event.target.value);
    };
    const prodoHandler = (event) => {
        SetProdo(event.target.value);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        EditdataloadRequest();
    };

    function EditdataloadRequest() {
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('description', description);
        params.append('prodo', prodo);
        params.append('me', localStorage.getItem('token'));
        fetch(`//${serverUrl}/api/provider/editprovider.php?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            if(data.status){
                showModalWithText(data.message);
                navigate('/profile/postav');
            }else{
                showModalWithText(data.message);
            }
        })
        .catch(error => {
            showModalWithText(error.message);
        });
    }
    return (
      <>
       <ModalAlert show={showModal} onClose={() => setShowModal(false)} text={modalText} />
       <Header />
        <main className='profile pay'>
        <div className='w250'>
        <Link className='bt' to='/profile/postav'>Вернуться назад</Link>
        </div>
        <div className='page'>
            {loading ? (
                <>
                Загрузка
                </>
            ) : (
                <>
                    <h4>ПАНЕЛЬ ПОСТАВЩИКА | РЕДАКТИРОВАНИЕ</h4>
                        <form onSubmit={submitHandler}>
                            <div>
                                <p className='mini'>Название</p>
                                <input type="text" name="name" defaultValue={data.name} onChange={nameHandler} />
                            </div>
                            <div>
                                <p className='mini'>Описание</p>
                                <textarea name="description" defaultValue={data.description} onChange={descriptionHandler} />
                            </div>
                            <div>
                                <p className='mini'>Работоспособнось</p>
                                <label>
                                <select name="prodo" defaultValue={data.prodo} onChange={prodoHandler}>
                                    <option value="1">Работает</option>
                                    <option value="0">Не работает</option>
                                </select>
                                <p className='mini'>Если указать "Не работает", ваши товары будут недоступны и Вы не будете отображаться в списках поставщиков</p>
                                </label>
                            </div>
                            <div>
                                <button>Сохранить данные</button>
                            </div>
                            <div>
                                <button className='red' type="reset">Отменить изменения</button>
                            </div>
                        </form>
                </>
            )}
             </div> 
        </main>
        <Footer />
        </>
    )
  }
  