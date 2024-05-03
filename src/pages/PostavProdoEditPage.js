import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom'; 
import Header from "../components/Header";
import serverUrl from "../config";
import Footer from '../components/Footer';

export default function PostavProdoEditPage() {
  document.title = "Панель поставщика | Редактирование товара";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState(null);
  const [money, setMoney] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productid = searchParams.get('id');
  
  useEffect(() => {
    const fetchData = async () => {
    try {
        setLoading(true); 
        window.scrollTo(0, 0)       
        const params = new URLSearchParams();
        params.append('id',productid);
        const response = await fetch(`//${serverUrl}/api/product/item.php?${params.toString()}`);
        const jsonData = await response.json();
        setData(jsonData.data);
        setName(jsonData.data.name);
        setDescription(jsonData.data.description);
        setMoney(jsonData.data.money);
        setBanner(jsonData.data.img);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
    };
    fetchData();
    // eslint-disable-next-line
}, []); // Пустой массив зависимостей

    const handleImageChange = (e) => {

      const formData = new FormData();
      formData.append('photo', e.target.files[0]);
  
      fetch(`//${serverUrl}/api/product/addphoto.php`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Image uploaded successfully:', data);
          setBanner(data.imgname);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
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
      Edit_Prodo();
    };
    
    async function Edit_Prodo() {
      try {
          setLoading(true);
          const params = new URLSearchParams();
          params.append('prodo', productid);
          params.append('name', name);
          params.append('description', description);
          params.append('banner', banner);
          params.append('money', money);
          params.append('me', localStorage.getItem('token'));
          const response = await fetch(`//${serverUrl}/api/product/edit.php?${params.toString()}`);
          const jsonData = await response.json();
          if(jsonData.status){
              alert("Обновлено");
              navigate('/profile/postav/prodo');
          }
      } catch (error) {
          console.log(error);
      } finally{
          setLoading(false);
      }
      };

    return (
      <>
       <Header />
        <main className='profile pay'>
        <div className='w250'>
        <Link className='bt' to='/profile/postav/prodo'>Вернуться назад</Link>
        </div>
        <div className='page'>
            <h3>РЕДАКТИРОВАНИЕ ТОВАРА</h3>
            {loading ? (
                        <>
                            Загрузка
                        </>
                ) : (
                      <>
                      <form onSubmit={submitHandler}>
                        <div className='duo start'>
                            <form >
                              <p>Название товара</p>
                                <input type="text" defaultValue={data.name} onChange={nameHandler} />
                                <p>Стоимость товара</p>
                                <input  defaultValue={data.money}  type="number" onChange={moneyHandler} />
                            </form>
                            <div className='coll'>
                            <img className='imgprodo' src={`//${serverUrl}/img/${banner}`} alt="/" />
                            <p className='mini'>Убедитесь, что выбрали именно тот товар на фото</p>
                            <input type="file" name='photo' onChange={handleImageChange} />
                            </div>
                           
                          </div>
                          <p>Описание товара</p>
                          <textarea  defaultValue={data.description}  onChange={descriptionHandler}></textarea>
                          <button>Сохранить изменения</button>
                          <button className='red' type='reset'>Сбросить изменения</button>
                          </form>
 
                        </>
                     )
                }
            </div>
        </main>
        <Footer />
        </>
    )
  }
  
  