import React, { useEffect, useState } from 'react';
import { serverUrl } from "../config";
import Header from "../components/Header";
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalAlert from '../components/ModalAlert';

export default function ReplysPage() {
  document.title = "Акция...";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const stokid = searchParams.get('id');

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
        const params = new URLSearchParams();
        params.append('me', localStorage.getItem('token'));
        const responses = await fetch(`//${serverUrl}/api/review/allpostav.php?${params.toString()}`);
        const jsonTrans = await responses.json();
        if(jsonTrans.status){
          document.title = jsonTrans.data.name;
          setData(jsonTrans.data);
        }else{
          navigate('/400');
        }
    } catch (error) {
        showModalWithText(error.message);
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
      <ModalAlert show={showModal} onClose={() => setShowModal(false)} text={modalText} />
        <main>
          { loading ? (
          <>
          <p className='noauth'>Идёт загрузка</p>
          </>) : (
          <>
            {
             data.map((item) => (
              <div key={item.id} className="cart">
                <h4>{item.username}</h4>
                <p>{item.message}</p>
                <button onClick={() => navigate(`/profile/postav/reply?id=${item.id}`)}>Детали отзыва</button>
              </div>
              ))
          }
          </>)}

        </main>
        <Footer />
      </>
    )
  }
  
