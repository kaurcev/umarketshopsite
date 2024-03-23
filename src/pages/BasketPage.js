import React, { useEffect } from 'react';
import Header from "../components/Header";

export default function BasketPage() {
  document.title = "Ваша корзина";
  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
    return (
      <>
      <Header />
        <main>
            <p>Скоро</p>
        </main>
      </>
    )
  }
  