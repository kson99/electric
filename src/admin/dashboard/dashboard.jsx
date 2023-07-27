import React, { useContext, useEffect } from "react";
import "./dashboard.css";
import axios from "axios";
import { appContext, url } from "../../App";

function Dashboard() {
  const { ordersCtx } = useContext(appContext);
  const [orders, setOrders] = ordersCtx;

  const getOrders = async () => {
    await axios.get(url + "/orders").then((res) => {
      //
      setOrders(res.data.reverse());
      console.log(res.data);
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="dashboard a-page">
      <div className="dash-cont cont">Dashboard</div>
    </div>
  );
}

export default Dashboard;
