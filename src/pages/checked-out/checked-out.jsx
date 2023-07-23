import React, { useEffect, useState } from "react";
import "./checked-out.css";
import axios from "axios";
import { url } from "../../App";

function CheckedOut() {
  const [response, setResponse] = useState();
  const getPaymentStatus = () => {
    const fields = JSON.parse(localStorage.getItem("query"));
    const resData = {};

    axios.post("localhost:3001/payments/status", fields).then((res) => {
      console.log(res.data);
      setResponse(res.data);
    });

    switch (resData.TRANSACTION_STATUS) {
      case 0:
        // Transaction not done
        break;

      case 1:
        // Transaction approved
        break;

      case 2:
        // Transaction Declined
        break;

      case 3:
        // Transaction Cancelled
        break;

      case 4:
        // Transaction User Cancelled
        break;

      case 5:
        // Transaction Received by PayGate
        break;

      case 7:
        // Transaction Settlement Voided
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    getPaymentStatus();
  }, []);
  return (
    <div className="checked-out">
      <div className="max-width">
        <div className="checked-out-cont">
          <p>this is payment status</p>
          <div>{JSON.stringify(response)}</div>
        </div>
      </div>
    </div>
  );
}

export default CheckedOut;
