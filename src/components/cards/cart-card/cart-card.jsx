import React, { useContext, useEffect, useState } from "react";
import "./cart-card.css";
import IonIcon from "@reacticons/ionicons";
import { appContext } from "../../../App";

function CartCard({ item, setSubtotal }) {
  const { cartCtx } = useContext(appContext);
  const { setCartProducts } = cartCtx;

  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(item.price);

  const qtyBtnClick = (btn) => {
    if (btn === "-") {
      if (qty > 1) {
        setQty(qty - 1);
      }
    } else if (btn === "+") {
      setQty(qty + 1);
    }
  };

  const getTotal = () => {
    setTotal(item.price * qty);
    setSubtotal((prev) => {
      let array = { ...prev };

      array[item._id] = item.price * qty;
      return array;
    });
  };

  const removeFromCart = () => {
    setCartProducts((prev) => {
      localStorage.setItem(
        "cart",
        JSON.stringify([...prev].filter((id) => id !== item._id))
      );
      return [...prev].filter((id) => id !== item._id);
    });

    setSubtotal((prev) => {
      let obj = { ...prev };
      delete obj[item._id];

      return obj;
    });
  };

  useEffect(() => {
    getTotal();
  }, [qty]);

  return (
    <div className="cart-card">
      <img src={item.images[0]} alt="image" />

      <div className="info">
        <p>{item.title}</p>
        <p>
          N${" "}
          {(total * 1).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <div className="qty-ctrl">
          <div
            className="minus"
            style={{
              backgroundColor: qty === 1 ? "grey" : "#252525",
              cursor: qty === 1 ? "not-allowed" : "pointer",
            }}
            onClick={() => qtyBtnClick("-")}
          >
            <IonIcon name="remove" className="icon" />
          </div>
          <div className="count">
            <p>{qty}</p>
          </div>
          <div className="plus" onClick={() => qtyBtnClick("+")}>
            <IonIcon name="add" className="icon" />
          </div>
        </div>
      </div>

      <div className="close" onClick={removeFromCart}>
        <IonIcon name="close" className="icon" />
      </div>
    </div>
  );
}

export default CartCard;
