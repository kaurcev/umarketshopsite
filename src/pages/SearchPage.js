import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

export default function SearchPage() {
    document.title = "Результаты поиска";
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
        <Header />
        <main>
            <h4>РЕЗУЛЬТАТЫ ПОИСКА ПО ЗАПРОСУ: "{search}"</h4>
        </main>
        </>
    )
  }
  