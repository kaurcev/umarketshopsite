import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import FormSignUp from '../components/FormSignUp';

export default function Signup() {
  document.title = "Вы уже зарегистрированы";
  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
  return (
    <>
    <main className="centered">
      {localStorage.getItem('token') ? (
        <>
          <p>Вы уже авторизированы</p>
          <p><Link className='bt' to="/">Перейти</Link></p>
        </>
      ) : (
        <>
        <FormSignUp />
        </>
      )}
    </main>
    <Footer />
    </>
  );
}