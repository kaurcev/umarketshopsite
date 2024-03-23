import React, { useEffect } from 'react';
import Header from "../components/Header";

export default function AdminPage() {
  document.title = "Панель администратора";
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
  