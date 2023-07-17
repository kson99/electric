import React, { useContext } from "react";
import "./navbar.css";
import IonIcon from "@reacticons/ionicons";
import { appContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { cartCtx } = useContext(appContext);
  const { cartProducts, setOpenCart } = cartCtx;
  const navigate = useNavigate();

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

  return (
    <div className="navbar">
      <div className="max-width">
        <div className="top-contact"></div>

        <div className="nav">
          <Link to="/" className="logo">
            <h1>Electric</h1>
            <IonIcon name="flash" className="icon" />
          </Link>

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

          <div className="menu">
            <div>
              <IonIcon name="heart-outline" className="icon" />
              <p>Wishlist</p>
              <div className="badge">
                <b>{0}</b>
              </div>
            </div>
            <div onClick={() => setOpenCart(true)}>
              <IonIcon name="cart-outline" className="icon" />
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
