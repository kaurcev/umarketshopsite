import React, { useState, useEffect } from "react";
import { serverUrl } from "../config";
import ComplaintAlert from "./ComplaintAlert";
import "../styles/ReviewBar.css";

const ReviewsBar = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("product", id);
        const responses = await fetch(
          `//${serverUrl}/reviews?${params.toString()}`
        );
        const jsonTrans = await responses.json();
        setData(jsonTrans.data);
      } catch (error) {
        setData([
          {
            id: "1",
            username: "Система юМаркет Шоп",
            message: `При загрузке данных произошла ошибка: ${error.message}.`,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  const [showComplaint, setShowComplaint] = useState(false);
  const [typeComplaint, setTypeComplaint] = useState("");
  
  const showComplaintAlert = () => {
    setShowComplaint(true); // Показываем модальное окно
  };

  const ComplaintReply = () =>{
    setTypeComplaint("2")
    showComplaintAlert();
  }


  if (!id) return null;
  return (
    <>
      <ComplaintAlert
        show={showComplaint}
        type={typeComplaint}
        to={id}
        onClose={() => setShowComplaint(false)}
      />
    <div className="reviews">
      <h4>Отзывы</h4>
      <div className="scrool">
        {loading ? (
          <>
            <div className="review load"></div>
            <div className="review load"></div>
            <div className="review load"></div>
          </>
        ) : (
          <>
            {data.length < 1 ? (
              <>
                <div className="noauth">Отзывов пока нет</div>
              </>
            ) : (
              <>
                {data.map((item) => (
                  <div className="review" key={item.id}>
                    <h5 className="duo b w"><span>{item.username}</span> <span onClick={() => ComplaintReply()} ><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span></h5>
                    <pre>{item.message}</pre>
                    <p className="mini">{item.date}</p>
                    {item.reply === "" ? (
                      <></>
                    ) : (
                      <>
                        <div className="replied">
                          <h6>Ответ поставщика</h6>
                          <pre>{item.reply}</pre>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default ReviewsBar;
