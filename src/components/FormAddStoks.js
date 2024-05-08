import React, { useState } from 'react';
import serverUrl from "../config";

export default function FormAddStoks() {
    document.title = "Добавление акции";
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dateend, setDateend] = useState('');
  
    async function AddStok() {
      try {
          setLoading(true);
          const params = new URLSearchParams();
          params.append('name', name);
          params.append('descr', description);
          params.append('dateend', dateend);
          params.append('me', localStorage.getItem('token'));
          const response = await fetch(`//${serverUrl}/api/stoks/add.php?${params.toString()}`);
          const jsonData = await response.json();
          if(jsonData.status){
              alert("Добавлено");
          }
      } catch (error) {
          console.log(error);
      } finally{
          setLoading(false);
      }
      };

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
      AddStok();
    };

    return (
        <>
        <form onSubmit={submitHandler}>
            <p className="mini">Название акции</p>
            <input maxLength="50" placeholder='Название акции' type="text" onChange={nameHandler} />
            <p className="mini">Описание акции</p>
            <textarea maxLength="5000" placeholder='Расскажите о акции' onChange={descHandler} />
            <p className="mini">Дата окончания акции</p>
            <input type="datetime-local" onChange={dateendHandler} />
            <p className="mini">Обратите внимание, что создавемая Вами акция будет отображаться у польззователей в главном меню!</p>
            {loading ? (<p><button disabled><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></button></p>) : 
            (<p><button>Создать акцию</button></p>)}
             <button className='red' type='reset'>Сбросить изменения</button>
        </form>
        </>
    );
}