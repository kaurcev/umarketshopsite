import React, { useEffect } from 'react';
import Header from "../components/Header";

export default function HelpPage() {
  document.title = "Помощь";
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
  