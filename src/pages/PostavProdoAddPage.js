import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from "../components/Header";
import serverUrl from "../config";

export default function PostavProdoAddPage() {
  document.title = "Панель поставщика";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bannerLoad, setBannerLoad] = useState(true);
 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState(null);
  const [money, setMoney] = useState('');

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

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

    const skipimage = async (text) => {
      setBanner(text);
      setBannerLoad(false);
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

    const submitHandler = (event) => {
        event.preventDefault();
        AddProdo();
      };
    
    return (
      <>
       <Header />
        <main className='profile pay'>
        <div className='w250'>
        <Link className='bt' to='/profile/postav'>Вернуться назад</Link>
        </div>
        <div className='page'>
            <h3>Добавление товара</h3>
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
                                    <button className='o' onClick={() => skipimage("none.png")}>Добавить потом</button>
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
            </div>
        </main>
        </>
    )
  }
  
  