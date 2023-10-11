import React, { useContext } from "react";
import "./payment.css";
import { toCurrency } from "../../../utils";
import { appContext } from "../../../grobal/context";

function Payment({ cartProducts, getSubtotal, shipping }) {
  const { settings } = useContext(appContext);
  const info = JSON.parse(localStorage.getItem("information"));

  console.log(cartProducts);

  return (
    <div className="payment">
      <div className="fields">
        <h3>Checkout Info</h3>
        <table>
          <tbody>
            <tr className="field">
              <td>Email</td>
              <td>:</td>
              <td>{info?.contact.email}</td>
            </tr>

            <tr className="field">
              <td>Phone</td>
              <td>:</td>
              <td>{info?.contact.number}</td>
            </tr>

            <tr className="field">
              <td>Address</td>
              <td>:</td>
              <td>{info?.address.address}</td>
            </tr>

            <tr className="field">
              <td>Shipping fee</td>
              <td>:</td>
              <td>N$ {toCurrency(settings.shipping)} </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="check-out-items">
        <div className="items">
          {cartProducts.map((product) => (
            <div className="item" key={product._id}>
              <div className="col">
                <div className="image">
                  <img src={product.images[0]} alt="" />
                  <p>{product.qty}</p>
                </div>
                <p className="bold">{product.title}</p>
              </div>
              <p className="bold">
                N$
                {toCurrency(product.price)}
              </p>
            </div>
          ))}
        </div>

        <div className="pricing">
          <div className="price-cat">
            <p>Subtotal</p>
            <p className="bold">
              N$
              {toCurrency(getSubtotal)}
            </p>
          </div>

          <div className="price-cat">
            <p>Shipping</p>
            <p className="bold">N${toCurrency(shipping)}</p>
          </div>

          <div className="total">
            <p>Total</p>
            <p id="total">N$ {toCurrency(getSubtotal + shipping)}</p>
          </div>
        </div>
      </div>

      <div className="payment-type">
        <div>
          <h3>Payment</h3>
          <p>All transactions are secure and encrypted</p>
        </div>

        <div className="paygate">
          <div className="header">
            <img src="./paygate.png" alt="" />
            <div className="cards">
              <img src="./visa.jpg" alt="" />
              <img src="./mastercard.png" alt="" />
            </div>
          </div>

          <div className="cards-info">
            <img src="/card.png" alt="" />
            <p>
              After clicking “Complete order”, you will be redirected to PayGate
              to complete your purchase securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
