import React, { useContext, useState } from "react";
import "./cart-popup.css";
import { appContext } from "../../App";
import IonIcon from "@reacticons/ionicons";
import CartCard from "../cards/cart-card/cart-card";

function CartPopup() {
  const { cartCtx, products, cartOpen } = useContext(appContext);
  const { cartProducts, openCart, setOpenCart } = cartCtx;
  const [subtotal, setSubtotal] = useState({});
  const [closing, setClosing] = useState(false);

  const getcartProducts = () => {
    let _products = [];

    cartProducts.map((prod) => {
      const pItem = products.find(({ _id }) => _id === prod);
      _products.push(pItem);
    });

    return _products;
  };

  const closeCart = () => {
    setClosing(true);
    setTimeout(() => {
      setOpenCart(false);
      setClosing(false);
    }, 300);
  };

  const getSubtotal = () => {
    let _subtotal = 0;

    Object.keys(subtotal).forEach((key, index) => {
      _subtotal += subtotal[key];
    });

    return _subtotal;
  };

  return (
    openCart && (
      <div className="cart-popup" onClick={closeCart}>
        <div
          className={closing ? "cart-cont closing" : "cart-cont"}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="header">
            <h4>Shopping Cart ({cartProducts.length})</h4>
            <IonIcon name="close" className="icon" onClick={closeCart} />
          </div>

          <div className="body">
            {getcartProducts().map((item) => (
              <CartCard item={item} key={item._id} setSubtotal={setSubtotal} />
            ))}
          </div>

          <div className="foot">
            {cartProducts.length > 0 ? (
              <div className="checkout">
                <div className="sub-tot">
                  <p>Sub-Total</p>
                  <p>
                    N${" "}
                    {getSubtotal().toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <textarea placeholder="Order note"></textarea>
                <p>Shipping and Taxes calculated at checkout</p>
                <button className="submitBtn">
                  <IonIcon name="lock-closed" />
                  <p>Checkout</p>
                </button>
              </div>
            ) : (
              <div className="cart-empty">
                <IonIcon name="cart" className="icon" />
                Your Cart is Empty
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default CartPopup;
