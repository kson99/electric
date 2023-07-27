import React from "react";
import "./orders.css";

function Orders() {
  return (
    <div className="orders a-page">
      <div className="orders-cont cont">
        <h1>Orders</h1>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Recipient</th>
              <th>Products</th>
              {/* <th></th> */}
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>{}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
