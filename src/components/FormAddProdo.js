import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from "../config";
import ModalAlert from '../components/ModalAlert';

export default function FormAddProdo() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [bannerLoad, setBannerLoad] = useState(true);
    const [stoks, setStoks] = useState([]);
    const [stok, setStock] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [banner, setBanner] = useState(null);
    const [money, setMoney] = useState('');
  
    const [image, setImage] = useState(null);

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
  
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };


    useEffect(() => {
      const stoksData = async () => {
        try {
            setLoading(true);        
            const params = new URLSearchParams();
            params.append('me', localStorage.getItem('token'));
            const responses = await fetch(`//${serverUrl}/mystocks?${params.toString()}`);
            const jsonTrans = await responses.json();
            setStoks(jsonTrans.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
        };
        stoksData();
      // eslint-disable-next-line
  }, []); // Пустой массив зависимостей
  
    const handleSubmit = (e) => {
      setLoading(true);
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('photo', image);
  
      fetch(`//${serverUrl}/loadimage`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Image uploaded successfully:', data);
          setBanner(data.imgname);
          setBannerLoad(false);
        })
        .catch((error) => {
          showModalWithText(error.message);
        });
        setLoading(false);
    };
  
    async function AddProdo() {
      try {
          setLoading(true);
          const params = new URLSearchParams();
          params.append('name', name);
          params.append('description', description);
          params.append('banner', banner);
          params.append('money', money);
          params.append('stok', stok);
          params.append('me', localStorage.getItem('token'));
          const response = await fetch(`//${serverUrl}/provider/addproduct?${params.toString()}`);
          const jsonData = await response.json();
          if(jsonData.status){
              showModalWithText("Добавлено");
              navigate('/profile/postav/prodo');
          }
      } catch (error) {
          console.log(error);
      } finally{
          setLoading(false);
      }
      };
          
      const nameHandler = (event) => {
          setName(event.target.value);
      };
      const descriptionHandler = (event) => {
          setDescription(event.target.value);
      };
      const moneyHandler = (event) => {
          setMoney(event.target.value);
      };
      const stoksHandler = (event) => {
        setStock(event.target.value);
    };
  
  
      const submitHandler = (event) => {
          event.preventDefault();
          AddProdo();
        };

    return (
        <>
        <ModalAlert show={showModal} onClose={() => setShowModal(false)} text={modalText} />
                  <>
                            {bannerLoad ? (
                            <>
                                <form className='photoload' onSubmit={handleSubmit}>
                                    <input type="file" name='photo' onChange={handleImageChange} />
                                    {
                                      loading ? (
                                            <button disabled><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></button>
                                        ) : (
                                            <button type="submit">Загрузить</button>
                                        )
                                    }
                                </form>
                            </>) : (
                            <>
                             <form onSubmit={submitHandler}>
                             <img className='imgprodo' src={`//${serverUrl}/img/${banner}`} alt="/" />
                            <div className='duo start'>
                            <div>
                             <p className='mini'>Описание товара</p>
                                <textarea required  maxLength="5000" placeholder='Это наш безупречный товар...' onChange={descriptionHandler}></textarea>
                             </div>
                            <div>
                                <p className='mini'>Название товара</p>
                                <input required  placeholder='Название товара' type="text" onChange={nameHandler} />
                                <p className='mini'>Стоимость товара</p>
                                <input required  placeholder='Стоимость товара' min="5" max="1000000" type="number" onChange={moneyHandler} />
                                <p className='mini'>Выберите акцию (При наличии)</p>
                                <select onChange={stoksHandler}>
                                <option value="">Не указано</option>
                                   {
                                    stoks.map((item) => (
                                      <option key={item.id} value={item.id}>{item.name}</option>
                                    ))
                                    }
                              </select>
                              </div>
                            </div>
                            <div className='duo'>
                                {
                                  loading ? (
                                        <button disabled><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></button>
                                    ) : (
                                        <button>Добавить</button>
                                    )
                                } 
                                <button className='red' type='reset'>Сбросить изменения</button>
                            </div>
                            </form>
                            </>
                            )
                        }
                    </>
        </>
    );
}