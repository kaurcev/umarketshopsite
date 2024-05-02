import React, { useEffect } from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';

export default function StartProvidePage() {
  document.title = "Как стать поставщиком";
  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
    return (
      <>
      <Header />
        <main>
          <h1>Как стать поставщиком?</h1>
          <p>Пока идёт разработка и тестирование сервиса, некоторые тестировщики получат доступ к панели поставщика.</p>
          <p>Ближе к официальному деплою я реализую анкету для подачи заявки на поставщика</p>
        </main>
        <Footer />
      </>
    )
  }
  