import { useEffect, useState } from "react";
import { serverUrl } from "../config";
import ModalAlert from "./ModalAlert";

const LoadImages = ({ bannerImage, id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState("");

  // Для отображения модального окна
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const showModalWithText = (text) => {
    setModalText(text); // Устанавливаем текст для модального окна
    setShowModal(true); // Показываем модальное окно
    setTimeout(() => {
      setShowModal(false); // Автоматически скрываем модальное окно через 3 секунды
    }, 1500);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("id", id);
        const responses = await fetch(
          `//${serverUrl}/product/images?${params.toString()}`
        );
        const jsonTrans = await responses.json();
        setData(jsonTrans.data);
        setBanner(bannerImage);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей

  const photodelete = async (url) => {
    try {
      const params = new URLSearchParams();
      params.append("url", url);
      params.append("me", localStorage.getItem("token"));
      const response = await fetch(
        `//${serverUrl}/product/images/del?${params.toString()}`
      );
      const jsonData = await response.json();
      if (jsonData.status) {
        setData((prevData) => prevData.filter((item) => item.photo !== url));
      }
    } catch (error) {}
  };

  const loadbanner = async (url) => {
    try {
      const params = new URLSearchParams();
      params.append("prodo", id);
      params.append("banner", url);
      params.append("me", localStorage.getItem("token"));
      const response = await fetch(
        `//${serverUrl}/product/images/edit?${params.toString()}`
      );
      const jsonData = await response.json();
      if (jsonData.status) {
        showModalWithText("Баннер установлен");
      }
    } catch (error) {
      showModalWithText(error.message);
    } finally {
    }
  };

  const bannerupdate = (image) => {
    setBanner(image);
    loadbanner(image);
  };


  const handleImageChange = async (e) => {
    try {
      const formData = new FormData();
      const params = new URLSearchParams();
      params.append("prod", id);
      params.append("me", localStorage.getItem('token'));
      formData.append("photo", e.target.files[0]);
      const responses = await fetch(`//${serverUrl}/product/images/add?${params.toString()}`, {
        method: "POST",
        body: formData,
      });
      const jsonTrans = await responses.json();
      if (jsonTrans.status) {
        const newItem = {
          num: data.length + 1,
          photo: jsonTrans.data.imgname,
          prod: id,
        };
        setData((prevData) => [...prevData, newItem]);
      } else {
        showModalWithText(jsonTrans.message);
      }
    } catch (error) {
      showModalWithText(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!id) return null;
  return (
    <div>
      {loading ? <></> : <></>}
      <ModalAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        text={modalText}
      />
      <h3>Баннер и фото товара</h3>
      <div className="coll">
        <div
          className="backimgprodo"
          style={{ backgroundImage: `url("//${serverUrl}/img/${banner}")` }}
        >
          <img
            className="imgprodo"
            src={`//${serverUrl}/img/${banner}`}
            alt="Картинка подгружается..."
          />
        </div>
        <p className="mini">Эта картинка будет баннером товара</p>
      </div>
      <div className="photobar">
        {data.map((item) => (
          <div className="cart">
            <img
              key={item.num}
              className="miniimage"
              src={`//${serverUrl}/img/${item.photo}`}
              alt={item.prod}
            />
            <button onClick={() => bannerupdate(item.photo)}>
              Сделать баннером
            </button>
            <button onClick={() => photodelete(item.photo)} className="red">
              Удалить
            </button>
          </div>
        ))}
        <div className="cart">
          <input
            className="loadImageForm"
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadImages;
