import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HelpPage() {
  document.title = "Помощь";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <main>
        <p>
          По поводу вопросов обращаться на
          электронную почту: support@umarketshop.site
        </p>

            <p>Скоро на этой странице будет полноценная форма приёма вопросов!</p>
      </main>
      <Footer />
    </>
  );
}
