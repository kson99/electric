import React, { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import { appContext, url } from "../../App";
import axios from "axios";
import { toCurrency } from "../../utils";

function Dashboard() {
  const { products } = useContext(appContext);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    await axios.get(url + "/orders").then((res) => {
      //
      setOrders(res.data.reverse());
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getTimedOrders = (period) => {
    let count = 0;

    orders.forEach((order) => {
      switch (period) {
        case "day":
          let date = order.date.split("T")[0];
          const [year, month, day] = date.split("-");
          const thisDay = new Date().getDate();

          if (day * 1 === thisDay) {
            count += 1;
          }

          break;
        case "month":
          let _date = order.date.split("T")[0];
          const [_year, _month, _day] = _date.split("-");
          const thisMonth = new Date().getMonth();

          if (_month * 1 === thisMonth + 1) {
            count += 1;
          }
          break;
        default:
          break;
      }
    });

    return count;
  };

  const getRevenue = (period) => {
    let revenue = 0;

    orders.forEach((order) => {
      switch (period) {
        case "day":
          let date = order.date.split("T")[0];
          const [year, month, day] = date.split("-");
          const thisDay = new Date().getDate();

          if (day * 1 === thisDay) {
            revenue += order.amount * 1;
          }
          break;
        case "month":
          let _date = order.date.split("T")[0];
          const [_year, _month, _day] = _date.split("-");
          const thisMonth = new Date().getMonth();

          if (_month * 1 === thisMonth + 1) {
            revenue += order.amount * 1;
          }
          break;

        case "all":
          revenue += order.amount * 1;
          break;

        default:
          break;
      }
    });

    return revenue;
  };

  return (
    <div className="dashboard a-page">
      <div className="dash-cont cont">
        <h1>Dashboard</h1>

        <div className="fields">
          <div className="field">
            <h3>Orders</h3>
            <div className="cat">
              <div className="today">
                <h5 className="time">Today</h5>
                <p className="count">{getTimedOrders("day")}</p>
              </div>

              <div className="month">
                <h5 className="time">This Month</h5>
                <p className="count">{getTimedOrders("month")}</p>
              </div>

              <div className="overall">
                <h5 className="time">Overall</h5>
                <p className="count">{orders.length}</p>
              </div>
            </div>
          </div>

          <div className="field">
            <div className="cat">
              <div className="graph"></div>
              <div className="products-count">
                <h5 className="title">Products</h5>
                <p className="count">{products.length}</p>
                <p className="count-info">Items</p>
              </div>
            </div>
          </div>

          <div className="field">
            <h3>Revenue</h3>
            <div className="cat">
              <div className="today">
                <h5 className="time">Today</h5>
                <p className="balance">N$ {toCurrency(getRevenue("day"))}</p>
                <p className="count-info">
                  {getTimedOrders("day")} orders Today
                </p>
              </div>

              <div className="month">
                <h5 className="time">This Month</h5>
                <p className="balance">N$ {toCurrency(getRevenue("month"))}</p>
                <p className="count-info">
                  {getTimedOrders("month")} orders this month
                </p>
              </div>

              <div className="overall">
                <h5 className="time">Overall</h5>
                <p className="balance">N$ {toCurrency(getRevenue("all"))}</p>
                <p className="count-info">{orders.length} orders overall</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
