import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from "../config";
import ModalAlert from '../components/ModalAlert';

export default function StocksPage() {
    document.title = "Проводимые акции";
    const navigate = useNavigate();
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

    useEffect(() => {
      const fetchData = async () => {
      try {
          setLoading(true);        
          const responses = await fetch(`//${serverUrl}/api/stoks/all.php`);
          const jsonTrans = await responses.json();
          setData(jsonTrans.data);
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
      <ModalAlert show={showModal} onClose={() => setShowModal(false)} text={modalText} />
      <Header />
        <main>
            <p>Скоро вы сможете тут увидеть акции от наших поставщикв!</p>
            <div className='stoklist'>
              {loading ? (
            <>
            <p className='noauth'>
              Загрузка
            </p>
            </>
          ) : (
            <>
            {
              data.length < 1 ? (
                <>
                    <p className='noauth'>
                        Акций ещё нет
                    </p>
                </>
              ) : (
                <>
                {
                  data.map((item) => (
                    <div className='stokitem' onClick={() => navigate(`/stock?id=${item.id}`)} key={item.id}>
                      <div>
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <p className='mini'>{item.datecreate} - {item.dateend}</p>
                        <h5>{item.provider}</h5>
                      </div>
                    </div>
                ))
                }
                </>
              )
            }
            </>
          )}
        </div>
        </main>
        <Footer />
      </>
    )
  }
  