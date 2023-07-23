import React, { useState } from "react";
import "./checkout.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import IonIcon from "@reacticons/ionicons";
import Payment from "./payment/payment";
import Information from "./information/information";
import { url } from "../../App";

function Checkout() {
  const { state } = useLocation();
  const formRef = useRef();
  const [submit, setSubmit] = useState(false);
  const [checksum, setChecksum] = useState("");
  const [payId, setPayId] = useState("");
  const [activeTab, setActiveTab] = useState("payment");

  const makePayment = async () => {
    let fields = {};
    await axios
      .post(url + "/payments", {
        amount: state.total,
      })
      .then((res) => {
        let resArray = res.data.split("&");

        resArray.forEach((field) => {
          let [key, value] = field.split("=");
          fields[key] = value;
        });

        console.log(res);

        setChecksum(fields.CHECKSUM);
        setPayId(fields.PAY_REQUEST_ID);
        setSubmit(true);
      });
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

            <button className="submitBtn" onClick={() => makePayment()}>
              Pay Up
            </button>
          </div>

          <div className="check-out-cart">
            <p>gdfkghkfdjhgkdh</p>
          </div>

          {submitForm()}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
