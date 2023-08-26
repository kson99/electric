import React, { useEffect, useState } from "react";
import "./sidebar.css";
import IonIcon from "@reacticons/ionicons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.setup";

function Sidebar() {
  const [activePage, setActivePage] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  const setActive = () => {
    if (
      location.pathname === "/admin" ||
      location.pathname === "/admin/dashboard"
    ) {
      setActivePage("dashboard");
    } else if (location.pathname.includes("/admin/products")) {
      setActivePage("products");
    } else if (location.pathname.includes("/admin/categories")) {
      setActivePage("categories");
    } else if (location.pathname.includes("/admin/settings")) {
      setActivePage("settings");
    } else if (location.pathname.includes("/admin/orders")) {
      setActivePage("orders");
    }
  };

  const highlightActive = () => {
    const active = document.getElementById(activePage);
    const other = document.querySelectorAll(".sidebar .pages a");

    if (other !== null) {
      other.forEach(n => {
        n.style.backgroundColor = "transparent";
        n.style.color = "#fff";
      });
    }

    if (active !== null) {
      active.style.backgroundColor = "aqua";
      active.style.color = "#252525";
    }
  };

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        // setIsLoading(false);
        localStorage.setItem("token", false);
        navigate("/admin");
      })
      .catch(err => {
        // setIsLoading(false);
        // setErrText("Login failed. Try again");
        // errorToast();
        console.log(err);
      });
  };

  useEffect(
    () => {
      setActive();
    },
    [location.pathname]
  );

  useEffect(
    () => {
      highlightActive();
    },
    [activePage]
  );

  return (
    <div className="sidebar">
      <div className="header">
        <IonIcon name="storefront-outline" className="icon" />
        <div>
          <h3>E-commerce</h3>
          <p>Admin</p>
        </div>
      </div>

      <div className="pages">
        <Link to="/admin/dashboard" id="dashboard">
          <IonIcon name="home-outline" className="icon" />
          <p>Dashboard</p>
        </Link>
        <Link to="/admin/products" id="products">
          <IonIcon name="layers-outline" className="icon" /> <p>Products</p>
        </Link>
        <Link to="/admin/categories" id="categories">
          <IonIcon name="list-outline" className="icon" />
          <p>Categories</p>
        </Link>
        <Link to="/admin/settings" id="settings">
          <IonIcon name="settings-outline" className="icon" />
          <p>Settings</p>
        </Link>
        <Link to="/admin/orders" id="orders">
          <IonIcon name="wallet-outline" className="icon" />
          <p>Orders</p>
        </Link>
        <div className="footer">
          <button id="logout" onClick={logout}>
            <p>Log out</p>
            <IonIcon name="exit-outline" className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
