import React, { useContext, useState } from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../App";
import { toCurrency } from "../../utils";
import IonIcon from "@reacticons/ionicons";
import { CartTableRow } from "../../components";

function Cart() {
  const { cartCtx, products } = useContext(appContext);
  const { cartProducts } = cartCtx;

  const navigate = useNavigate();
  const [subtotal, setSubtotal] = useState({});
  const [checkoutProducts, setCheckoutProducts] = useState({});

  const getCartProducts = () => {
    let _products = [];

    cartProducts.map((prod) => {
      const pItem = products.find(({ _id }) => _id === prod);
      _products.push(pItem);
    });

    return _products;
  };

  const getSubtotal = () => {
    let _subtotal = 0;

    Object.keys(subtotal).forEach((key, index) => {
      _subtotal += subtotal[key];
    });

    return _subtotal;
  };

  const checkout = () => {
    navigate("/checkout", {
      state: {
        total: getSubtotal(),
        cartData: checkoutProducts,
      },
    });
  };

  return (
    <div className="shopping-cart">
      <div className="max-width">
        <div className="sc-cont">
          <h2>Shopping Cart</h2>

          {cartProducts.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {getCartProducts().map((product) => (
                  <CartTableRow
                    item={product}
                    key={product._id}
                    setSubtotal={setSubtotal}
                    setProducts={setCheckoutProducts}
                  />
                ))}

                <tr className="subtotal">
                  <td></td>
                  <td></td>
                  <td>SubTotal:</td>
                  <td>N$ {toCurrency(getSubtotal())}</td>
                </tr>
              </tbody>
            </table>
          )}

          <div className="foot">
            {cartProducts.length > 0 ? (
              <div className="checkout">
                <textarea placeholder="Order note"></textarea>
                <div>
                  <p>Shipping and Taxes calculated at checkout</p>
                  <button className="submitBtn" onClick={checkout}>
                    <IonIcon name="lock-closed" />
                    <p>Checkout</p>
                  </button>
                </div>
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
    </div>
  );
}

export default Cart;
