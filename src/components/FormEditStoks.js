import React, { useEffect, useState } from 'react';
import serverUrl from "../config";
import { useLocation } from 'react-router-dom';

export default function FormEditStoks() {
    document.title = "Добавление акции";
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dateend, setDateend] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const stockid = searchParams.get('id');
  

    useEffect(() => {
      const fetchData = async () => {
      try {
          setLoading(true); 
          window.scrollTo(0, 0)       
          const params = new URLSearchParams();
          params.append('id',stockid);
          params.append('me',localStorage.getItem('token'));
          const response = await fetch(`//${serverUrl}/api/stoks/item.php?${params.toString()}`);
          const jsonData = await response.json();
          setName(jsonData.data.name);
          setDescription(jsonData.data.description);
          setDateend(jsonData.data.dateend);
      } catch (error) {
          console.log(error);
      } finally {
          setLoading(false);
      }
      };
      fetchData();
      // eslint-disable-next-line
  }, []); // Пустой массив зависимостей


    const nameHandler = (event) => {
      setName(event.target.value);
    };

    const descHandler = (event) => {
      setDescription(event.target.value);
    };

    const dateendHandler = (event) => {
      setDateend(event.target.value);
    };

    const submitHandler = (event) => {
      event.preventDefault();
      updateStock();
    };

    async function updateStock() {
      try {
          setLoading(true);
          const params = new URLSearchParams();
          params.append('id', stockid);
          params.append('name', name);
          params.append('descr', description);
          params.append('dateend', dateend);
          params.append('me', localStorage.getItem('token'));
          const response = await fetch(`//${serverUrl}/api/stoks/update.php?${params.toString()}`);
          const jsonData = await response.json();
          if(jsonData.status){
              alert("Обновлено");
          }
      } catch (error) {
          console.log(error);
      } finally{
          setLoading(false);
      }
      };

    return (
        <>
        <form onSubmit={submitHandler}>
            <p className="mini">Название акции</p>
            <input maxLength="50" placeholder='Название акции' value={name} type="text" onChange={nameHandler} />
            <p className="mini">Описание акции</p>
            <textarea maxLength="5000" placeholder='Расскажите о акции' value={description} onChange={descHandler} />
            <p className="mini">Дата окончания акции</p>
            <input type="datetime-local" value={dateend}  onChange={dateendHandler} />
            <p className="mini">Обратите внимание, что создавемая Вами акция будет отображаться у польззователей в главном меню!</p>
            {loading ? (<p><button disabled><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></button></p>) : 
            (<p><button>Обновить</button></p>)}
             <button className='red' type='reset'>Сбросить изменения</button>
        </form>
        </>
    );
}