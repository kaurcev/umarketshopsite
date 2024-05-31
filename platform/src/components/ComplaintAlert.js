import { useState } from "react";
import { serverUrl } from "../config";
import survey from '../img/survey.png';
import "../styles/ModalAlert.css";

const ComplaintAlert = ({ show, onClose, to, type }) => {
  const [loading, setLoading] = useState(false);
  const [sently, setSently] = useState(false);
  const [texted, setReview] = useState("");
  if (!show) return null;

  const reviewHandler = (event) => {
    setReview(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ComplaintsRequest();
  };

  const ComplaintsRequest = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("type", type);
      params.append("to", to);
      params.append("me", localStorage.getItem("token"));
      params.append("complaint", texted);
      const response = await fetch(
        `//${serverUrl}/api/сomplaints/add.php?${params.toString()}`
      );
      const jsonData = await response.json();
      if (jsonData.status) {
        setSently(true);
      } else {
        setSently(false);
      }
    } catch (error) {
      setSently(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fullscreen" onDoubleClick={onClose}>
      <div className="panel">
        {
          sently ? (<>
            <div className="center">
              <img src={survey} alt="Принято" />
              <h3>Жалоба принята</h3>
              <p className="mini">Наша модерация примет меры</p>
              <button className="o" onClick={onClose}>Закрыть окно</button>
            </div>
          </>) : (<>
            <h3 className="duo b">
              <span>Отправить жалобу</span>
              <span className="reds" onClick={onClose}><i className="fa fa-close" aria-hidden="true"></i></span>
            </h3>
            <p>В этом окне вы можете отправить жалобу</p>
            <form onSubmit={submitHandler} >
              <p className="mini">Опишите ниже то, что случилось или не понравилось Вам</p>
              <textarea onChange={reviewHandler} placeholder="Введите то, что Вам не понравилось" />
              <p className="mini">После отправки модерация рассмотрит Вашу жалобу и примет меры</p>
              {loading ? (
                <p>
                  <button disabled>
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                  </button>
                </p>
              ) : (
                <p>
                  <button>Отправить жалобу</button>
                </p>
              )}
            </form>
          </>)
        }
      </div>
    </div>
  );
};
export default ComplaintAlert;
