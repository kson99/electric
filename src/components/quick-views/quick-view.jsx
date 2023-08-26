import React, { useContext, useEffect, useState } from "react";
import "./quick-view.css";
import IonIcon from "@reacticons/ionicons";
import { Rating } from "react-simple-star-rating";
import { toCurrency } from "../../utils";
import { appContext } from "../../grobal/context";

function QuickView() {
  const { categories, quickViewCtx, cartCtx, wishlistCtx} = useContext(appContext);
  const { quickView, setQuickView, quickViewProduct } = quickViewCtx;
  const {setOpenCart, setCartProducts} = cartCtx;
  const [wishlist] = wishlistCtx;

  const [image, setImage] = useState(quickViewProduct.images[0] || "");
  const [activeImage, setActiveImage] = useState();
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    setCartProducts((prev) => {
      let array = [...prev];
      array.indexOf(quickViewProduct._id) === -1 && array.push(quickViewProduct._id);

      localStorage.setItem("cart", JSON.stringify(array));
      return array;
    });


    setQuickView(false);
    setOpenCart(true);
  };

  const addToWishList = () => {
    setWishlist(prev => {
      let array = [...prev];
      array.indexOf(quickViewProduct._id) === -1 && array.push(quickViewProduct._id);

      localStorage.setItem("wishlist", JSON.stringify(array));
      return array;
    });
  }

  const handleImages = () => {
    const images = document.querySelectorAll(".img-nav img");
    const active = document.getElementById(activeImage);

    images.forEach(n => {
      n.style.opacity = 0.35;
      n.style.border = "none";
    });

    if (active !== null) {
      active.style.opacity = 1;
      active.style.border = "1px solid #ddd";
    }
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

  const resetStates = () => {
    setImage(quickViewProduct.images[0]);
    setActiveImage("img0");
  };

  const getCategoryName = (id) => {
    const catItem = categories.find(({ _id }) => _id === id);
    return catItem?.name;
  };

  const getRating = () => {
    let array = [];
    let total = 0;
    let rating = 0;

    if (quickViewProduct.reviews) {
      quickViewProduct?.reviews.forEach((review) => {
        array.push(review.rating);
        total += review.rating * 1;
      });

      rating = total / array.length;
    }

    return rating;
  };

  const isInWishlist = () => {
    let is = false;

    if (wishlist.includes(quickViewProduct?._id.toString())) {
      is = true;
    }

    return is;
  };

  useEffect(
    () => {
      handleImages();
    },
    [image, activeImage]
  );

  useEffect(() => {
    resetStates();
  }, []);

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

  let catProperties = [];
  if (quickViewProduct.category !== "" && categories?.length > 0) {
    const cat = categories.find(({ _id }) => _id === quickViewProduct.category);
    catProperties.push(...cat?.properties);

    if (cat?.parent !== "") {
      const catParent = categories.find(({ _id }) => _id === cat.parent);

      catProperties.push(...catParent?.properties);
    }
  }

  return (
    quickView &&
    <div className="quick-view">
      <div className="max-width">
        <div className="qw-cont">
          <div className="qw-img">
            <img src={image} alt="" id="main-img" />
            <div className="img-nav">
              {quickViewProduct.images.map((img, _i) =>
                <img
                  src={img}
                  alt=""
                  key={_i}
                  id={`img${_i}`}
                  onClick={() => {
                    setImage(img);
                    setActiveImage(`img${_i}`);
                  }}
                />
              )}
            </div>
          </div>

          <div className="details">
              <h2>{quickViewProduct.title}</h2>

              <div className="rating-rev">
                <Rating
                  fillColor="red"
                  size={17}
                  allowFraction={true}
                  allowHover={false}
                  initialValue={getRating()}
                  className="stars"
                />

                <p>({quickViewProduct.reviews ? quickViewProduct.reviews.length : 0} reviews)</p>
              </div>

              <div className="seperator"></div>

              <h1 className="price">N$ {toCurrency(quickViewProduct.price)}</h1>

              <div className="seperator"></div>

              {catProperties.length > 0 && (
                  <div className="category">
                  <p>Category: </p>
                  <b>{getCategoryName(quickViewProduct.category)}</b>
                </div>
              )}

              {catProperties?.map((prop, i) => (
                  <div className="property" key={i}>
                  <p>{prop?.name}:</p>
                  <b>{quickViewProduct.properties[prop.name]}</b>
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

              <div className="seperator"></div>

              <div className="buttons">
                <button id="add-to-cart" onClick={addToCart}>
                  <IonIcon name="cart-outline" />
                  <p>Add to cart</p>
                </button>
                
                {!isInWishlist() &&
                <button id="add-to-wishlist" onClick={addToWishList}>
                  <IonIcon name="heart-outline" />
                  <p>Add to Wishlist</p>
                </button>
                }
              </div>
            </div>

          <div className="close" onClick={() => setQuickView(false)}>
            <IonIcon name="close-circle" className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickView;
