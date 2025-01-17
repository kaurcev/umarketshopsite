import React, { useState, useEffect } from "react";
import { serverUrl } from "../config";
import "../styles/ReviewBar.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProdImgBar = ({ id, banner }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");

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
        if (jsonTrans.data.status) {
          setImg(`//${serverUrl}/img/${banner}`);
        } else {
          setImg(`//${serverUrl}/img/${jsonTrans.data[0].photo}`);
        }
      } catch (error) {
        setData([{ num: "0", photo: banner, prod: id }]);
        setImg(`//${serverUrl}/img/${banner}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []); // Пустой массив зависимостей
  const imageopen = (image) => {
    setImg(image);
  };
  if (!id) return null;
  return (
    <>
      {loading ? (<>
        <div className="imagebar">
          <div className="miniimage load"></div>
          <div className="miniimage load"></div>
          <div className="miniimage load"></div>
        </div>
        <div className="imgback">
          <img className="preview load" alt="" />
        </div>
      </>) : (<>
        <div className="imagebar">
          <>
            {data.length < 1 ? (
              <>
                <LazyLoadImage
                  effect="blur"
                  className="miniimage"
                  onClick={() => imageopen(`//${serverUrl}/img/${img}`)}
                  src={`//${serverUrl}/img/${img}`}
                  alt=""
                />
              </>
            ) : (
              <>
                {data.map((item) => (
                  <LazyLoadImage
                    effect="blur"
                    key={item.num}
                    className="miniimage"
                    onClick={() =>
                      imageopen(`//${serverUrl}/img/${item.photo}`)
                    }
                    src={`//${serverUrl}/img/${item.photo}`}
                    alt={item.prod}
                  />
                ))}
              </>
            )}
          </>
        </div>

        <div className="imgback" style={{ backgroundImage: `url("${img}")` }}>
          <LazyLoadImage src={img} className="preview" alt={data.name} />
        </div>

      </>)}
    </>
  );
};

export default ProdImgBar;