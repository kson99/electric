import React, { useContext } from "react";
import "./featured.css";
import { appContext } from "../../App";
import Skeleton from "react-loading-skeleton";
import { toCurrency } from "../../utils";
import { useNavigate } from "react-router-dom";

function Featured({ item }) {
  const { dataLoading } = useContext(appContext);
  const navigate = useNavigate();

  return (
    <section className="promo-header">
      <div className="max-width">
        <div className="promo-cont">
          <div className="promo-text">
            {dataLoading ? (
              <Skeleton height={20} />
            ) : (
              <h1 className="price">N$ {toCurrency(item?.price)}</h1>
            )}
            <h1>{item?.title || <Skeleton />}</h1>

            <button
              onClick={() => {
                navigate(
                  `/${item.title
                    .replaceAll(" ", "-")
                    .replaceAll(".", ",")
                    .replaceAll("/", "OR")}`,
                  {
                    state: { item },
                  }
                );
              }}
            >
              NOW AVAILABLE
            </button>
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
