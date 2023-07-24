import React from "react";
import "./product-list-card.css";
import Skeleton from "react-loading-skeleton";

function ProductListCardSkel({ count }) {
  return Array(count)
    .fill(0)
    .map((_, i) => (
      <div className="product-list-skel" key={i}>
        <div className="prod-details p-col">
          <div className="image">
            <Skeleton height={"100%"} width={"100%"} />
          </div>
          <h3 className="title">
            <Skeleton width={"100%"} />
          </h3>
        </div>

        <div className="prod-crud p-col">
          <div>
            <Skeleton height={"100%"} />
          </div>

          <div>
            <Skeleton height={"100%"} />
          </div>
        </div>
      </div>
    ));
}

export default ProductListCardSkel;
