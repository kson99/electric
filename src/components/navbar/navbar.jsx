import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import IonIcon from "@reacticons/ionicons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { appContext } from "../../grobal/context";

function Navbar() {
  const { cartCtx, wishlistCtx } = useContext(appContext);
  const { cartProducts, setOpenCart } = cartCtx;
  const [wishlist] = wishlistCtx;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState("");

  const searchSubmit = (ev) => {
    ev.preventDefault();

    navigate("/products", {
      state: { name: "search", searchTxt: ev.target.searchTxt.value },
    });
  };

  const inputChange = (ev) => {
    const clear = document.getElementById("clear");
    clear.style.opacity = 0;

    if (ev.target.value !== "") {
      clear.style.opacity = 1;
    }
  };

  const cleaInput = () => {
    const form = document.querySelector(".search");

    form.reset();
  };

  const handlePathChange = () => {
    switch (pathname) {
      case "/":
        setActiveLink("home");
        break;
      case "/wishlist":
        setActiveLink("wishlist");
        break;

      case "/cart":
        setActiveLink("cart");
        break;

      default:
        setActiveLink("");
        break;
    }
  };

  useEffect(() => {
    handlePathChange();
  }, [pathname]);

  return (
    <div className="navbar">
      <div className="max-width">
        <div className="top-contact" />

        <div className="nav">
          <Link to="/" className="logo">
            <h1>Electric</h1>
            <IonIcon name="flash" className="icon" />
          </Link>

          <div id="search-container">
            <form onSubmit={searchSubmit} className="search">
              <IonIcon name="search" className="icon" />
              <input
                type="text"
                placeholder="search here..."
                name="searchTxt"
                required
                onChange={inputChange}
              />

              <IonIcon name="close" id="clear" onClick={cleaInput} />
            </form>
          </div>

          <div className="menu">
            <div onClick={() => navigate("/")} id="home-icon">
              <IonIcon
                name={activeLink === "home" ? "home" : "home-outline"}
                className="icon"
              />
              <p>Home</p>
            </div>

            <div onClick={() => navigate("/wishlist")}>
              <IonIcon
                name={activeLink === "wishlist" ? "heart" : "heart-outline"}
                className="icon"
              />
              <p>Wishlist</p>
              {wishlist.length > 0 && (
                <div className="badge">
                  <b>{wishlist.length}</b>
                </div>
              )}
            </div>

            <div onClick={() => setOpenCart(true)}>
              <IonIcon
                name={activeLink === "cart" ? "cart" : "cart-outline"}
                className="icon"
              />
              <p>Cart</p>
              {cartProducts.length > 0 && (
                <div className="badge">
                  <b>{cartProducts.length}</b>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
