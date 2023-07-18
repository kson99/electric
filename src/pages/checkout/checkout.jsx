import React, { useState } from "react";
import "./checkout.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";

function Checkout() {
  const { state } = useLocation();
  const formRef = useRef();
  const [submit, setSubmit] = useState(false);
  const [checksum, setChecksum] = useState("");
  const [payId, setPayId] = useState("");

  const makePayment = async (ev) => {
    ev.preventDefault();

    let fields = {};
    await axios
      .post("http://localhost:3001/payments", {
        amount: state.total,
      })
      .then((res) => {
        let resArray = res.data.split("&");

        resArray.forEach((field) => {
          let [key, value] = field.split("=");
          fields[key] = value;
        });

        setChecksum(fields.CHECKSUM);
        setPayId(fields.PAY_REQUEST_ID);
        setSubmit(true);
      });
  };

  const submitForm = () => {
    return (
      <form
        ref={formRef}
        action="https://secure.paygate.co.za/payweb3/process.trans"
        method="POST"
      >
        <input type="hidden" name="PAY_REQUEST_ID" value={payId} />
        <input type="hidden" name="CHECKSUM" value={checksum} />
      </form>
    );
  };

  if (submit) {
    setTimeout(() => {
      formRef.current && formRef.current.submit();
    }, 1000);
  }

  return (
    <div className="check-out">
      <div className="max-width">
        <div className="check-out-cont">
          <div className="customer-info">
            <h3>Pay with Card</h3>

            <form onSubmit={makePayment} className="card-info">
              <div className="field">
                <label>email</label>
                <input type="email" placeholder="johndoe@gmail.com" />
              </div>

              <div className="field">
                <label>Card information</label>
                <div className="c-info">
                  <input type="number" placeholder="1234 1234 1234 1234" />
                  <input type="number" placeholder="MM / YY" />
                  <input type="number" placeholder="CVC" />
                </div>
              </div>

              <div className="field">
                <label>Name on card</label>
                <input type="text" placeholder="johndoe@gmail.com" />
              </div>

              <div className="firld">
                <label>Country or Region</label>
                <div className="country">
                  <select>
                    <option value="Namibia">Namibia</option>
                  </select>
                  <input type="text" placeholder="ZIP" />
                </div>
              </div>

              <button type="submit" className="submitBtn">
                Pay N${" "}
                {state.total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </button>
            </form>

            {submit && submitForm()}
          </div>
          <div className="your-order">
            <h3>Your Order</h3>

            <div className="order"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
