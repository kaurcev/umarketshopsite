import React, { useEffect } from 'react';
import Header from "../components/Header";

export default function PostavPage() {
  document.title = "Панель поставщика";
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
  