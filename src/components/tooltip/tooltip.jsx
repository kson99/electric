import React, { useContext } from "react";
import "./tooltip.css";
import IonIcon from "@reacticons/ionicons";
import { appContext } from "../../grobal/context";

function IconWithTooltip({ name, text, item }) {
  const { wishlistCtx, quickViewCtx } = useContext(appContext);
  const [wishlist, setWishlist] = wishlistCtx;
  const { setQuickView, setQuickViewProduct } = quickViewCtx;

  const isInWishlist = () => {
    let is = false;

    if (wishlist.includes(item?._id.toString())) {
      is = true;
    }

    return is;
  };

  const onIconClick = ev => {
    ev.stopPropagation();

    switch (name) {
      case "heart-outline":
        // Add to Wishlist
        if (isInWishlist()) {
          removeFromWishlist();
        } else {
          addToWishlist();
        }
        break;

      case "eye-outline":
        // Quick view popup
        setQuickView(true);
        setQuickViewProduct({ ...item });
        break;

      default:
        break;
    }
  };

  const addToWishlist = () => {
    setWishlist(prev => {
      let array = [...prev];
      array.indexOf(item._id) === -1 && array.push(item._id);

      localStorage.setItem("wishlist", JSON.stringify(array));
      return array;
    });
  };

  const removeFromWishlist = () => {
    setWishlist(prev => {
      let newArray = [...prev].filter(id => id !== item._id);
      localStorage.setItem("wishlist", JSON.stringify(newArray));
      return newArray;
    });
  };

  const showIcon = () => {
    let _name = "";
    switch (name) {
      case "heart-outline":
        if (isInWishlist()) {
          _name = "heart";
        } else {
          _name = "heart-outline";
        }
        break;
      case "eye-outline":
        _name = "eye-outline";
        break;
      default:
        _name = name;
        break;
    }

    return _name;
  };

  const showText = () => {
    let _text = "";
    switch (text) {
      case "Add to Wishlist":
        if (isInWishlist()) {
          _text = "remove";
        } else {
          _text = text;
        }
        break;
      case "Quick View":
        _text = text;
        break;
      default:
        _text = text;
        break;
    }

    return _text;
  };

  return (
    <div className="tooltip">
      <div className="tooltip-text">
        <p>
          {showText()}
        </p>
        <div className="arrow">
          <div className="pointer" />
        </div>
      </div>

      <div className="icon-btn" onClick={onIconClick}>
        <IonIcon name={showIcon()} className="icon" />
      </div>
    </div>
  );
}

export default IconWithTooltip;
