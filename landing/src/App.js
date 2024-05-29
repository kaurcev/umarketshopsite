import './App.css';
import Header from './components/Header';
import Welcome from './components/Welcome';
import logo from './img/logo.png';
import apipage from './img/api.png';
import bugspage from './img/bugs.png';
import vk from './img/vk.png';
import tg from './img/tg.png';
import screen from './img/screen.png';
import app from './img/app.png';

function App() {
  return (
    <>
      <Header />
      <Welcome />
      <main>
        <div className='page duo'>
          <div>
            <h2>Что такое юМаркет Шоп?</h2>
            <p>юМаркет Шоп - это наша платформа электронной коммерции, которая позволяет начать торговать уже завтра!</p>
          </div>
          <div>
            <img alt='' src={logo} />
          </div>
        </div>

        <div className='page'>
          <div>
            <h2>О проекте</h2>
            <p>  ..... ..... . .. . . . .  . . . . .  </p>
          </div>
          <div className='duo'>
            <img alt='' src={app} />
            <img alt='' src={screen} />
          </div>
        </div>

        <div className='page'>
          <div>
            <h2>Интеграции</h2>
            <p>Мы предоставляем интеграции с одними из удобных социальных платформ - VK и Telegram. Это значит, что вы без сложности сможете войти в наш маркетплейс с официальных приложений социальных платформ.</p>
          </div>
          <div className='duo'>
            <img alt='' src={vk} />
            <img alt='' src={tg} />
          </div>
        </div>

        <div className='page duo'>
          <div>
            <h2>Для разработчиков</h2>
            <p>Вы разработчик? Занимаетесь торговлоей? Тогда Вы по адресу!</p>
            <p>Мы предоставляем документацию к API, а это значит, что вы сможете интегрировать нашу в своё приложение или сайт! А за счёт расширенной документации к разным языкам программирования вы можете очень легко и быстро присоедениться в нашу систему!</p>
          </div>
          <div>
            <img alt='' src={apipage} />
          </div>
        </div>

        <div className='page duo'>
          <div>
            <h2>Любите тестировать?</h2>
            <p>Вы можете присоедениться к нашей разработке и принять участие в тестировании!</p>
          </div>
          <div>
            <img alt='' src={bugspage} />
          </div>
        </div>


        <div className='page duo'>
          <h2>Начните пользоваться прямо сейчас!</h2>
        </div>

      </main>
    </>
  );
}

export default App;
