import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { serverUrl } from "../../config";
import Footer from "../../components/Footer";
import NoAuthPage from "../NoAuthPage";

export default function PostavPage() {
  document.title = "Панель поставщика";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const params = new URLSearchParams();
        params.append("me", localStorage.getItem("token"));
        const response = await fetch(
          `//${serverUrl}/provider/me?${params.toString()}`
        );
        const jsonData = await response.json();
        setData(jsonData.data);
        if (!jsonData.status) {
          navigate("/profile");
        }
      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  if (!localStorage.getItem('token')) return (<><NoAuthPage /></>);
  return (
    <>
      <Header />
      <main className="profile pay">
        <div className="w250">
          <Link className="bt" onClick={() => navigate(-1)}>
            Вернуться назад
          </Link>
          <Link className='bt' to='/profile/postav/paystran'>
            Покупки и доставка
          </Link>
          <Link className="bt" to="/profile/postav/edit">
            Редактировать данные
          </Link>
          <Link className="bt" to="/profile/postav/prodo">
            Ваши товары
          </Link>
          <Link className="bt" to="/profile/postav/stoks">
            Ваши акции
          </Link>
          <Link className="bt" to="/profile/postav/replys">
            Отзывы товарам
          </Link>
        </div>
        <div className="page">
          {loading ? (
            <>Загрузка</>
          ) : (
            <>
              <h4>ПАНЕЛЬ ПОСТАВЩИКА</h4>
              <div>
                <div className="duo">
                  <div className="cartpanel">
                    <h2>{data.name}</h2>
                    <p>В числе поставщиков с: {data.datecreate}</p>
                    {data.prodo === "1" ? (
                      <>
                        <p className="mini">
                          Организация функционирует и товары отображаются в
                          каталоге
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="mini">
                          Организация отключена и товары не отображаются в
                          каталоге
                        </p>
                      </>
                    )}
                  </div>
                  <div className="cartpanel">
                    <p className="mini">Email: </p>
                    <p>{data.email}</p>
                    <p className="mini">Номер телефона</p>
                    <p>{data.phone}</p>
                  </div>
                </div>
                <p className="mini">Описание</p>
                <pre>{data.description}</pre>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
