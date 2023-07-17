import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./item-view.css";
import { Rating } from "react-simple-star-rating";
import IonIcon from "@reacticons/ionicons";
import { RelatedCard, Shipping } from "../../components";
import { appContext } from "../../App";

function ItemView() {
  const { categories, products, cartCtx } = useContext(appContext);
  const { setCartProducts, setOpenCart } = cartCtx;

  const { state, pathname } = useLocation();
  const item = state?.item;

  const [selectedTab, setselectedTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const tabs = ["description", "shipping & returns", "reviews"];
  const [image, setImage] = useState(item?.images[0] || "");
  const [activeImage, setActiveImage] = useState("img0");

  const getRelatedItems = () => {
    let array = [];

    products.forEach((_item) => {
      if (_item.category === item.category && _item._id !== item._id) {
        array.push(_item);
      }
    });

    return array.splice(0, 5);
  };

  const addToCart = (ev) => {
    ev.stopPropagation();

    setCartProducts((prev) => {
      let array = [...prev];
      array.indexOf(item._id) === -1 && array.push(item._id);

      localStorage.setItem("cart", JSON.stringify(array));
      return array;
    });

    setOpenCart(true);
  };

  const quantityClick = (sign) => {
    if (sign === "-") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    } else if (sign === "+") {
      setQuantity(quantity + 1);
    }
  };

  const tabsHighlight = () => {
    const tab = document.querySelectorAll(".item-view .tabs .tab");
    const active = document.getElementById(selectedTab);

    tab.forEach((n) => {
      n.style.color = "#2d2d2d";
      n.style.borderBottom = "2px solid transparent";
    });

    if (active !== null) {
      active.style.borderBottom = "2px solid red";
      active.style.color = "red";
    }
  };

  const tabSwitch = () => {
    switch (selectedTab) {
      case "description":
        return <p>{item.description}</p>;
        break;

      case "shipping & returns":
        return <Shipping />;
        break;

      default:
        break;
    }
  };

  const handleImages = () => {
    const images = document.querySelectorAll(".img-nav img");
    const active = document.getElementById(activeImage);

    images.forEach((n) => {
      n.style.opacity = 0.35;
      n.style.border = "none";
    });

    if (active !== null) {
      active.style.opacity = 1;
      active.style.border = "1px solid #ddd";
    }
  };

  const resetStates = () => {
    setImage(item.images[0]);
    setActiveImage("img0");
    setQuantity(1);
    setselectedTab("description");
  };

  const getCategoryName = (id) => {
    const catItem = categories.find(({ _id }) => _id === id);
    return catItem?.name;
  };

  useEffect(() => {
    handleImages();
  }, [image, activeImage]);

  useEffect(() => {
    const minus = document.getElementById("minus");

    if (quantity === 1) {
      minus.style.backgroundColor = "grey";
      minus.style.cursor = "not-allowed";
    } else {
      minus.style.backgroundColor = "#252525";
      minus.style.cursor = "pointer";
    }
  }, [quantity]);

  useEffect(() => {
    tabsHighlight();
  }, [selectedTab]);

  useEffect(() => {
    resetStates();
  }, [pathname]);

  let catProperties = [];
  if (item.category !== "" && categories?.length > 0) {
    const cat = categories.find(({ _id }) => _id === item.category);
    catProperties.push(...cat?.properties);

    if (cat?.parent !== "") {
      const catParent = categories.find(({ _id }) => _id === cat.parent);

      catProperties.push(...catParent?.properties);
    }
  }

  return (
    <div className="item-view">
      <div className="max-width">
        <div className="iv-cont">
          <div className="basic-details">
            <div className="images">
              <div className="img-nav">
                {item.images.map((_image, i) => (
                  <img
                    src={_image}
                    key={i}
                    alt=""
                    id={`img${i}`}
                    onClick={() => {
                      setImage(_image);
                      setActiveImage(`img${i}`);
                    }}
                  />
                ))}
              </div>
              <img src={image} id="disp-img" alt="" />
            </div>
            <div className="details">
              <h2>{item.title}</h2>

              <div className="rating-rev">
                <Rating
                  fillColor="red"
                  size={17}
                  initialValue={item.rating}
                  className="stars"
                />
                <p>(0 reviews)</p>
              </div>

              <h1 className="price">
                N${" "}
                {(item.price * 1).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>

              {catProperties.length > 0 && (
                <div className="category">
                  <p>Category: </p>
                  <b>{getCategoryName(item.category)}</b>
                </div>
              )}

              {catProperties?.map((prop, i) => (
                <div className="property" key={i}>
                  <p>{prop?.name}:</p>
                  <b>{item.properties[prop.name]}</b>
                </div>
              ))}

              <div className="quantity">
                <p>Qty:</p>
                <div className="quantity-cont">
                  <IonIcon
                    name="remove"
                    className="icon"
                    id="minus"
                    onClick={() => quantityClick("-")}
                  />
                  <p>{quantity}</p>
                  <IonIcon
                    name="add"
                    className="icon"
                    onClick={() => quantityClick("+")}
                  />
                </div>
              </div>

              <div className="buttons">
                <button id="add-to-cart" onClick={addToCart}>
                  <IonIcon name="cart-outline" />
                  <p>Add to cart</p>
                </button>

                <button id="add-to-wishlist">
                  <IonIcon name="heart-outline" />
                  <p>Add to Wishlist</p>
                </button>
              </div>
            </div>
          </div>

          <div className="other-details">
            <div className="tabs">
              {tabs.map((tab, i) => (
                <p
                  className="tab"
                  key={i}
                  id={tab}
                  onClick={() => setselectedTab(tab)}
                >
                  {tab}
                </p>
              ))}
            </div>

            <div className="content-show">{tabSwitch()}</div>
          </div>

          <div className="related-items">
            <h2>You may also like</h2>
            <div className="related">
              {getRelatedItems().map((_item, i) => (
                <RelatedCard item={_item} key={i} data={products} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemView;
