import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ApplicationPage() {
  document.title = "Как установить приложение";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <main>
        <h1>Как установить приложения на устройства</h1>
        <div>
          <div>
            <h2>Технология PWA (Progressive Web App)</h2>
            <p>
              Progressive Web App (PWA) - это веб-приложение, которое сочетает в
              себе преимущества веб-сайта и функциональности нативного
              приложения. PWA может работать в автономном режиме, иметь доступ к
              аппаратным возможностям устройства, а также предоставлять
              пользователю нативный интерфейс и функции, такие как уведомления.
            </p>
          </div>
        </div>
        <h2>Установка PWA приложения</h2>
        <h3>На компьютере:</h3>
        <p>1. Откройте веб-приложение в браузере.</p>
        <p>
          2. В адресной строке браузера найдите значок "Добавить на рабочий
          стол" (обычно это значок "+" или иконка с изображением ракеты).
        </p>
        <p>
          3. Щелкните на значке "Добавить на рабочий стол" и подтвердите
          установку PWA приложения.
        </p>
        <h3>На устройствах Android:</h3>
        <p>1. Откройте веб-приложение в браузере Google Chrome.</p>
        <p>
          2. В правом верхнем углу браузера найдите меню (три точки или значок с
          тремя вертикальными точками).
        </p>
        <p>
          3. В меню выберите пункт "Добавить на экран" или "Добавить на главный
          экран".
        </p>
        <p>
          4. Подтвердите установку PWA приложения на главный экран устройства.
        </p>
        <h3>На устройствах iOS:</h3>
        <p>1. Откройте веб-приложение в браузере Safari.</p>
        <p>2. Внизу экрана найдите панель инструментов браузера.</p>
        <p>3. Нажмите на значок "Поделиться" (квадрат с стрелкой вверх).</p>
        <p>4. В появившемся меню выберите пункт "На главный экран".</p>
        <p>
          5. Подтвердите установку PWA приложения на главный экран устройства.
        </p>
      </main>
      <Footer />
    </>
  );
}
