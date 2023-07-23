import React from "react";
import "./featured.css";

function Featured({ item }) {
  return (
    <section className="promo-header">
      <div className="max-width">
        <div className="promo-cont">
          <div className="promo-text">
            <h1 className="price">
              N${" "}
              {(item?.price * 1)?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h1>
            <h1>{item?.title}</h1>

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
