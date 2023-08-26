import React, { useContext, useEffect, useState } from "react";
import "./table-row.css";
import { toCurrency } from "../../../../utils";
import IonIcon from "@reacticons/ionicons";
import { appContext } from "../../../../grobal/context";

function CartTableRow({ item, setSubtotal, setProducts }) {
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

    setProducts((prev) => {
      let array = { ...prev };
      array[item._id] = {
        id: item._id,
        quantity: qty,
      };

      return array;
    });
  };

  const removeFromCart = () => {
    setCartProducts((prev) => {
      let newArray = [...prev].filter((id) => id !== item._id);
      localStorage.setItem("cart", JSON.stringify(newArray));
      return newArray;
    });

    setSubtotal((prev) => {
      let obj = { ...prev };
      delete obj[item._id];

      return obj;
    });

    setProducts((prev) => {
      let obj = { ...prev };
      delete obj[item._id];

      return obj;
    });
  };

  useEffect(() => {
    getTotal();
  }, [qty]);
  return (
    <tr className="cart-table-row">
      <td className="details">
        <img src={item.images[0]} alt="" />
        <p>{item.title}</p>
      </td>

      <td>N${toCurrency(item.price)}</td>

      <td>
        <div className="qty">
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
      </td>
      <td>N${toCurrency(total)}</td>
      <td className="close">
        <IonIcon
          name="close-circle"
          className="icon"
          onClick={removeFromCart}
        />
      </td>
    </tr>
  );
}

export default CartTableRow;
