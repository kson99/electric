import React, { useContext } from "react";
import "./featured.css";
import { appContext } from "../../App";
import Skeleton from "react-loading-skeleton";

function Featured({ item }) {
  const { dataLoading } = useContext(appContext);

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
            {dataLoading ? (
              <div className="skeleton">
                <Skeleton height={"100%"} width={"100%"} />
              </div>
            ) : (
              <img src={item?.images[0]} alt="promo image" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featured;
