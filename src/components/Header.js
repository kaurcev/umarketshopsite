import { Link } from 'react-router-dom';
import logo from '../img/logo.png'

export default function Header() {
    return (
        <>
          <header>
            <div className="header">
                <img className='logo' src={logo} alt="юМаркет Шоп"/>
                <nav>
                    {
                        localStorage.getItem('token') ? (
                            <>
                            <Link to="/profile">Ваш профиль</Link>
                            <Link to="/logout">Выйти</Link>
                            </>
                        ) : (
                            <>
                            <Link to="/auth">Войти</Link>
                            </>
                        )
                    }
                </nav>
            </div>
          </header>
          </>
    );
}