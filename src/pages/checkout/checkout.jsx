import React, { useContext, useState } from "react";
import "./checkout.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import IonIcon from "@reacticons/ionicons";
import Payment from "./payment/payment";
import Information from "./information/information";
import { appContext, url } from "../../App";
import { toCurrency } from "../../utils";

function Checkout() {
  const { products } = useContext(appContext);
  const { state } = useLocation();
  const cartData = state.cartData;
  const shipping = 30;

  const formRef = useRef();
  const [submit, setSubmit] = useState(false);
  const [checksum, setChecksum] = useState("");
  const [payId, setPayId] = useState("");
  const [activeTab, setActiveTab] = useState("payment");

  const checkout = async () => {
    let fields = {};
    await axios.post(url + "/payments", cartData).then((res) => {
      let resArray = res.data.split("&");

      resArray.forEach((field) => {
        let [key, value] = field.split("=");
        fields[key] = value;
      });

      localStorage.setItem("query", JSON.stringify(fields));

      setChecksum(fields.CHECKSUM);
      setPayId(fields.PAY_REQUEST_ID);
      setSubmit(true);
    });
  };

  const cartProducts = () => {
    let array = [];

    Object.keys(cartData).forEach((key) => {
      products.map((p) => {
        if (p._id === key) {
          array.push({ ...p, qty: cartData[key].quantity });
        }
      });
    });

    return array;
  };

  const getSubtotal = () => {
    let _subTotal = 0;

    cartProducts().map((p) => {
      _subTotal += p.qty * 1 * (p.price * 1);
    });

    return _subTotal;
  };

  const switchTabs = () => {
    switch (activeTab) {
      case "information":
        return <Information />;
        break;

      case "payment":
        return <Payment />;
        break;

      default:
        break;
    }
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
    }, 500);
  }

  return (
    <div className="check-out">
      <div className="c-left"></div>
      <div className="c-right"></div>

      <div className="check-out-cont">
        <div className="max-width c-o-c">
          <div className="check-out-info">
            <Link to="/" className="logo">
              <h1>Electric</h1>
              <IonIcon name="flash" className="icon" />
            </Link>

            <div className="tabs">
              <div className="tab">Cart&nbsp;&nbsp;{">"}</div>
              <div className="tab">Information&nbsp;&nbsp;{">"}</div>
              <div className="tab">Payment</div>
            </div>

            {switchTabs()}

            <button className="submitBtn" onClick={() => checkout()}>
              Pay Up
            </button>
          </div>

          <div className="check-out-cart">
            <div className="items">
              {cartProducts().map((product) => (
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
                  {toCurrency(getSubtotal())}
                </p>
              </div>

              <div className="price-cat">
                <p>Shipping</p>
                <p className="bold">N${toCurrency(shipping)}</p>
              </div>

              <div className="total">
                <p>Total</p>
                <p id="total">N$ {toCurrency(getSubtotal() + shipping)}</p>
              </div>
            </div>
          </div>

          {submitForm()}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
