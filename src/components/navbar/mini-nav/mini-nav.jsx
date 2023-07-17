import React, { useContext, useEffect, useState } from "react";
import "./mini-nav.css";
import IonIcon from "@reacticons/ionicons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { appContext } from "../../../App";

function MiniNav() {
  const { categories } = useContext(appContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState("home");
  const [isCatBrowse, setIsCatBrowse] = useState(false);

  const getSortCategories = () => {
    let obj = {};
    categories.map((cat) => {
      obj[cat.name] = {
        _id: cat._id,
        parent: cat.parent,
        name: cat.name,
        properties: cat.properties,
      };
    });

    const _obj = Object.keys(obj)
      .sort()
      .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {});

    return _obj;
  };

  const onDropDownClick = (ev, cat) => {
    ev.stopPropagation();

    navigate("/products", { state: cat });
  };

  const tabhighlight = () => {
    switch (pathname) {
      case "/":
        setActiveTab("home");
        break;

      default:
        break;
    }

    const active = document.getElementById(activeTab);
    if (active !== null) {
      console.log("runs");

      active.classList.add("active");
    }
  };

  useEffect(() => {
    tabhighlight();
  }, [pathname]);

  return (
    <div className="mini-nav">
      <div className="max-width">
        <div className="nav-tabs">
          <div className="cat-tab" onClick={() => setIsCatBrowse(!isCatBrowse)}>
            <IonIcon name="menu" className="icon" />
            <p>Browse Categories</p>
            <IonIcon name="chevron-down-outline" />

            {isCatBrowse && (
              <div className="categories">
                {Object.values(getSortCategories()).map((cat) => (
                  <div
                    className="cat"
                    key={cat._id}
                    onClick={(e) => onDropDownClick(e, cat)}
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="nav-links">
            <Link to="/" id="home">
              Home
            </Link>
            <Link to="/products" state={{ name: "All" }}>
              All products
            </Link>
          </div>

          <Link id="call-us">
            <IonIcon name="call-outline" className="icon" />
            <p>CALL: +0123 456 789</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MiniNav;
