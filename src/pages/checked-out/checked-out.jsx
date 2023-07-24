import React, { useEffect, useState } from "react";
import "./checked-out.css";
import axios from "axios";
import { url } from "../../App";
import BeatLoader from "react-spinners/BeatLoader";

function CheckedOut() {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");

  const getPaymentStatus = async () => {
    const fields = JSON.parse(localStorage.getItem("query"));
    const resData = {};

    await axios.post(url + "/payments/status", fields).then((res) => {
      let resArray = res.data.split("&");

      resArray.forEach((field) => {
        let [key, value] = field.split("=");
        resData[key] = value;
      });

      setIsLoading(false);
    });

    switch (resData?.TRANSACTION_STATUS) {
      case "0":
        // Transaction not done
        setStatus("Transaction not done!");
        break;

      case "1":
        // Transaction approved
        setStatus("Your payment has been approved!");
        break;

      case "2":
        // Transaction Declined
        setStatus("Your payment has been declined!");
        break;

      case "3":
        // Transaction Cancelled
        setStatus("Payment has been Cancelled!");
        break;

      case "4":
        // Transaction User Cancelled
        setStatus("You have Cancelled the Payment!");
        break;

      case "5":
        // Transaction Received by PayGate
        setStatus("Payment Received by PayGate!");
        break;

      case "7":
        // Transaction Settlement Voided
        setStatus("Payment Settlement Voided!");
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
          <p id="header">Payment Status:</p>

          <div id="status">
            {isLoading ? (
              <BeatLoader color="cornflowerblue" />
            ) : (
              <p>{status}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckedOut;
