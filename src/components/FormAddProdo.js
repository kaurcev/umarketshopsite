import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from "../config";

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
  
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };


    useEffect(() => {
      const stoksData = async () => {
        try {
            setLoading(true);        
            const params = new URLSearchParams();
            params.append('me', localStorage.getItem('token'));
            const responses = await fetch(`//${serverUrl}/api/stoks/get_me_stoks.php?${params.toString()}`);
            const jsonTrans = await responses.json();
            setStoks(jsonTrans.data);
        } catch (error) {
           // showModalWithText(error.message);
        } finally {
            setLoading(false);
        }
        };
        stoksData();
      // eslint-disable-next-line
  }, []); // Пустой массив зависимостей
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('photo', image);
  
      fetch(`//${serverUrl}/api/product/addphoto.php`, {
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
          console.error('Error uploading image:', error);
        });
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
          const response = await fetch(`//${serverUrl}/api/product/add.php?${params.toString()}`);
          const jsonData = await response.json();
          if(jsonData.status){
              alert("Добавлено");
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
            {loading ? (
                        <>
                            Загрузка
                        </>
                ) : (    
                  <>
                            {bannerLoad ? (
                            <>
                                <form className='photoload' onSubmit={handleSubmit}>
                                    <input type="file" name='photo' onChange={handleImageChange} />
                                    <button type="submit">Загрузить</button>
                                </form>
                            </>) : (
                            <>
                             <form onSubmit={submitHandler}>
                            <div className='duo start'>
                           <div>
                              <p>Название товара</p>
                                <input type="text" onChange={nameHandler} />
                                <p>Стоимость товара</p>
                                <input type="number" onChange={moneyHandler} />
                                <select onChange={stoksHandler}>
                                <option value="">Не указано</option>
                                   {
                                    stoks.map((item) => (
                                      <option key={item.id} value={item.id}>{item.name}</option>
                                    ))
                                    }
                              </select>
                              </div>
                              <img className='imgprodo' src={`//${serverUrl}/img/${banner}`} alt="/" />
                            </div>
                            <p>Описание товара</p>
                            <textarea onChange={descriptionHandler}></textarea>
                            <button>Добавить</button>
                                <button className='red' type='reset'>Сбросить изменения</button>
                            </form>
                            </>
                            )
                        }
                    </>
                )
                }
        </>
    );
}