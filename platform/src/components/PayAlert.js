import { useState } from "react";
import { serverUrl } from "../config";
import "../styles/ModalAlert.css";
import { useNavigate } from "react-router-dom";

const PayAlert = ({ show, onClose, postav, basket, product, money }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [moneys, setMoneys] = useState(false);
  if (!show) return null;

  // eslint-disable-next-line
  const moneyLoad = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('me', localStorage.getItem('token'));
      const responses = await fetch(
        `//${serverUrl}/getinformation?${params.toString()}`
      );
      const jsonData = await responses.json();
      setMoneys(jsonData.data.wallet);
    } catch {

    } finally {
      setLoading(false);
    }
  }

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
      <div className="panel center">
        <p>Вы собираетесь оформить товар с артиклом №{product}</p>
        <div>
          <h4>С вашего баланса карты будет списано {money}Р</h4>
          <p className="mini">После этой страницы вы будете перенаправлены на страницу с покупками</p>
        </div>
        <div className="duo gap10">
          {loading ? (<>
            <button disabled><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></button>
          </>) : (<>
            {
              moneys > money ? (<>
                <button onClick={() => addPayRequest()}>Списать</button>
              </>) : (<>
                <button disabled>Недостаточно средств..</button>
              </>)
            }
          </>)}
          <button onClick={onClose} className="o">Отмена</button>
        </div>
      </div>
    </div >
  );
};
export default PayAlert;
