import React, { useEffect } from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';

export default function StocksPage() {
  document.title = "Проводимые акции";
  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
    return (
      <>
      <Header />
        <main>
            <p>Скоро вы сможете тут увидеть акции от наших поставщикв!</p>
        </main>
        <Footer />
      </>
    )
  }
  