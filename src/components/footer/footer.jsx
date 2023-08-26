import React, { useContext, useState } from "react";
import "./footer.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";
import { appContext } from "../../grobal/context";

function Footer() {
  const { categories, dataLoading } = useContext(appContext);

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

  return (
    <div className="footer">
      <div className="max-width">
        <div className="f-tabs">
          <div className="electric">
            <div className="logo">
              <h1>Electric</h1>
              <IonIcon name="flash" className="icon" />
            </div>

            <p id="message">
              Welcome to the Realm of Limitless Innovation: Discover, Connect,
              and Elevate Your Digital Journey with Our Unparalleled Electronics
              Emporium! Unleash the Power of Tomorrow's Technology Today
            </p>

            <div className="info-call">
              <IonIcon name="call-outline" className="icon" />
              <div>
                <p>Got Questions? Call Us 24/7</p>
                <span>+0123 456 789</span>
              </div>
            </div>
          </div>

          <ul className="categories">
            <h3 className="header">Categories</h3>

            <div className="links">
              {Object.values(getSortCategories()).map((cat) => (
                <Link to="/products" key={cat._id} state={cat}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </ul>

          <ul className="my-account">
            <h3 className="header">Account</h3>
            <li>
              <Link to="">Sign In / Register</Link>
            </li>
            <li>
              <Link to="">View Cart</Link>
            </li>
            <li>
              <Link to="">Wishlist</Link>
            </li>
            <li>
              <Link to="">Help</Link>
            </li>
          </ul>

          <ul className="useful">
            <h3 className="header">Useful Links</h3>

            <li>
              <Link to="">About Electric</Link>
            </li>
            <li>
              <Link to="">Our Services</Link>
            </li>
            <li>
              <Link to="">How to shop on Electric</Link>
            </li>
            <li>
              <Link to="">FAQ</Link>
            </li>

            <li>
              <Link to="">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div id="copyright">
          <p>Copyright &copy; 2023 Electric. All rights reserved</p>
          <div id="pay-methods">
            <img src="visa.jpg" alt="" />
            <img src="mastercard.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
