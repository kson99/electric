import React from "react";
import "./featured.css";
import { promo_image } from "../../assets";
import { useContext } from "react";
import { appContext } from "../../App";

function Featured({ item }) {

  const { products } = useContext(appContext)


  return (
    <section className="promo-header">
      <div className="max-width">
        <div className="promo-cont">
          <div className="promo-text">
            {/* <h1 className="price">N$ 25, 000</h1> */}
            <h1 className="price">N$ {(item?.price * 1).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}</h1>
            {/* <h1>
              Deal | 2022 Lenovo Yoga 9i 14 2-in-1 with 2400p OLED and 12th gen
              Core i7-1260P now shipping
            </h1> */}
            <h1>
              {item?.title}
            </h1>

            <button>NOW AVAILABLE</button>
          </div>
          <div className="promo-img">
            <img src={item?.images[0]} alt="promo image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featured;
