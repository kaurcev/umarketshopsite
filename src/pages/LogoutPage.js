import React, { useState, useEffect } from 'react';
import { serverUrl } from "../config";

export default function LogoutPage() {
  document.title = "Выход";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
    try {
        setLoading(true);        
        const params = new URLSearchParams();
        params.append('me', localStorage.getItem('token'));
        const response = await fetch(`//${serverUrl}/api/user/logout.php?${params.toString()}`);
        const jsonData = await response.json();
        if(jsonData.status){
          localStorage.removeItem('token');
          window.location.href = '/';
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
    };
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

    return (
    <>
      {loading ? (
          <>
            <p>Завершение сеанса</p>
          </>
        ) : (
          <>
            <p>Готово!</p> 
          </>
      )}
    </>
  )
}
  