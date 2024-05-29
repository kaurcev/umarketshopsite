import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../config";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { YandexMetrica, AnalyticsGoogle } from "../../config";
import NoAuthPage from "../NoAuthPage";
import packageJson from '../../../package.json';

export default function AdminPage() {
  document.title = "Панель администратора";
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const response = await fetch(`//${serverUrl}/api/logs.php`);
        const jsonData = await response.text();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const localHandler = (event) => {
    setLocal(event.target.value);
    if (local === 1) {
      localStorage.setItem("local", event.target.value);
      alert(
        "Вы переключили сервер на локальный. Войдите на локальную учётную запись"
      );
      navigate("/logout");
    } else {
      localStorage.setItem("local", event.target.value);
      alert(
        "Вы переключили сервер на глобальный. Войдите на глобальную учётную запись"
      );
      navigate("/logout");
    }
  };
  if (!localStorage.getItem('token')) return (<><NoAuthPage /></>);
  return (
    <>
      <Header />
      <main className="profile pay">
        <div className="w250">
          <Link className="bt" onClick={() => navigate(-1)}>
            Вернуться назад
          </Link>
          <Link className="bt" to="/profile/admin/users">
            Пользователи
          </Link>
          <Link className="bt" to="/profile/admin/providers">
            Поставщики
          </Link>
          <Link className="bt" to="/profile/admin/prodo">
            Товары
          </Link>
          <Link className="bt" to="/profile/admin/complaints">
            Жалобы пользователей
          </Link>
          <Link className="bt" to="/profile/admin/trans">
            Финансовый отдел
          </Link>
          <Link target="_blank" className='bt' to='https://bugs.umarketshop.site/'>Баг-трекер</Link>
        </div>
        <div className="page">
          {loading ? (
            <>Загрузка</>
          ) : (
            <>
              <h4>ПАНЕЛЬ АДМИНИСТРАТОРА</h4>
              <div className="grid">
                <div>
                  <p>
                    Убедитесь, что на <i>127.0.0.1</i> развёрнута серверная
                    часть
                  </p>
                  <p className="mini">
                    Для работы на локальном хосте, Вам необходимо настроить алиас с 127.0.0.1 на bapi.umarketshop.site. Наша система настроена так, что при подключении к bapi.umarketshop.site будет совершено подключение к локальному хосту
                  </p>
                  <select
                    defaultValue={localStorage.getItem("local")}
                    onChange={localHandler}
                  >
                    <option value="0">Глобальный сервер</option>
                    <option value="1">Локальный сервер</option>
                  </select>
                  <p>
                    Статус локального сервера:{" "}
                    {local === "1" ? <>Включён</> : <>Выключен</>}
                  </p>
                  <h3>О React приложении</h3>
                  <p><i className="fa fa-code-fork" aria-hidden="true"></i> Версия проекта: {packageJson.version} build {packageJson.build}</p>
                  <p><i className="fa fa-cogs" aria-hidden="true"></i> Версия React: {packageJson.dependencies.react}</p>
                  <h3>Системы метрик</h3>
                  <p>Наиболее простой способ контроля активности пользователей. Нажмите на любую карточку</p>
                </div>
                <div className="duo">
                  <div className="yandex">
                    <Link to={YandexMetrica} className="cartpanel">
                      <div>
                        <h4>Yandex Metrika</h4>
                        <p className="mini">Тут можно оформить отчёты в формате PDF, сделать анализ поведения пользователей, карты скрллинга, нажатий, вебвизор и многое другое</p>
                      </div>
                    </Link>
                  </div>
                  <div className="google">
                    <Link to={AnalyticsGoogle} className="cartpanel">
                      <div>
                        <h4>Google Analytics</h4>
                        <p className="mini">Тут так же можно сделать анализ поведения пользователей, а так же смотреть на пользователей, которые прямо сейчас находятся на сайте в реальном времени</p>
                      </div>
                    </Link>
                  </div>
                </div>
                <div>
                  <h3><i className="fa fa-terminal" aria-hidden="true"></i> Лог-файлы</h3>
                  <p>При подключении к сайту создаются логи. С помощью их можно отследить неполадки в системе</p>
                  <p className="mini">Логи подключений к umarketshop.site</p>
                  <pre className="logs">{data}</pre>
                </div>

              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
