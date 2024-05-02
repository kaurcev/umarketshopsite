import React, { useEffect } from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';

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
        <Footer />
      </>
    )
  }
  