import React from "react";
import { shippingPolicy } from "../../assets";

function Shipping() {
  return (
    <div className="shipping-returns">
      <p>{shippingPolicy}</p>
      <br />
      <h2 className="p2">When will you get your order:</h2>
      <br />
      <div>
        <p> </p>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td>
                <span style={{ textDecoration: "underline" }}>
                  <strong> Time of Order</strong>
                </span>
              </td>
              <td>
                <span style={{ textDecoration: "underline" }}>
                  <strong> Main Areas</strong>
                </span>
              </td>
              <td>
                <span style={{ textDecoration: "underline" }}>
                  <strong> Regional Areas</strong>
                </span>
              </td>
              <td>
                <span style={{ textDecoration: "underline" }}>
                  <strong> Remote Areas</strong>
                </span>
              </td>
            </tr>
            <tr>
              <td> Weekday [Before 2PM]</td>
              <td> 2 - 5 Business Days</td>
              <td> 3 - 5 Business Days</td>
              <td> 5 -7 Business Days</td>
            </tr>
            <tr>
              <td> Weekday [After 2PM]</td>
              <td> 2 - 5 Business Days</td>
              <td> 3 - 5 Business Days</td>
              <td> 5 -7 Business Days</td>
            </tr>
            <tr>
              <td> Weekends</td>
              <td> 2 - 5 Business Days</td>
              <td> 4 - 5 Business Days</td>
              <td> 5 -7 Business Days</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Shipping;
