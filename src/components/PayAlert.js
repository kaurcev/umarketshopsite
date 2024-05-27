import { useState } from "react";
import { serverUrl } from "../config";
import "../styles/ModalAlert.css";
import { useNavigate } from "react-router-dom";

const PayAlert = ({ show, onClose, postav, basket, product, money }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  if (!show) return null;

  const addPayRequest = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("basket", basket);
      params.append("postav", postav);
      params.append("product", product);
      params.append("money", money);
      params.append("me", localStorage.getItem("token"));
      const response = await fetch(
        `//${serverUrl}/api/pay/add.php?${params.toString()}`
      );
      const jsonData = await response.json();
      if (jsonData.status) {
        navigate('/profile/paystran')
      } else {
        alert("Дурак ты ебанный");
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fullscreen">
      <div className="panel">
        <p>ID товара №{product}</p>
        <p>ID корзинного товара №{basket}</p>
        <p>ID провайдера №{postav}</p>
        <p>Это твой токен {localStorage.getItem("token")}</p>
        <div className="duo b">
          <button onClick={() => addPayRequest()}>Типа покупка</button>
          <button onClick={onClose} className="o">Типа отмена покупки</button>
        </div>
      </div>
    </div >
  );
};
export default PayAlert;
