import React, { useEffect, useState } from "react";
import "./orders.css";
import axios from "axios";
import { url } from "../../App";

function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    await axios.get(url + "/orders").then((res) => {
      //
      setOrders(res.data.reverse());
    });
  };

  const getFormatedDate = (date) => {
    let str = date.replaceAll("-", "/").split(".")[0];
    const [_date, _time] = str.split("T");
    const [year, month, day] = _date.split("/");

    return `${day + "/" + month + "/" + year}, ${_time}`;
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orders a-page">
      <div className="orders-cont cont">
        <h1>Orders</h1>

        <table id="main-t">
          <thead>
            <tr id="header">
              <th>Date</th>
              <th>Recipient</th>
              <th>Products</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="row">
                <td className="col">{getFormatedDate(order.date)}</td>
                <td className="col">{order.recipient}</td>
                <td className="col">
                  <table className="inner">
                    <tbody>
                      {order?.products.map((p) => (
                        <tr key={p._id}>
                          <td>
                            <img src={p.images[0]} alt="" />
                          </td>
                          <td>{p.title}</td>
                          <td>x{p.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td className="col">{order.address.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
