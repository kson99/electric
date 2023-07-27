import React from "react";
import "./payment.css";

function Payment() {
  const info = JSON.parse(localStorage.getItem("information"));

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
              <td>N$ 30,00 </td>
            </tr>
          </tbody>
        </table>
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
