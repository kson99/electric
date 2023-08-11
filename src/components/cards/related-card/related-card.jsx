import IonIcon from "@reacticons/ionicons";
import React, { useContext } from "react";
import { Rating } from "react-simple-star-rating";
import "./related-card.css";
import { useNavigate } from "react-router-dom";
import IconWithTooltip from "../../tooltip/tooltip";
import { appContext } from "../../../App";
import { toCurrency } from "../../../utils";

function RelatedCard({ item }) {
  const { cartCtx } = useContext(appContext);
  const { setCartProducts, setOpenCart } = cartCtx;
  const navigate = useNavigate();

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

  const doNothing = (ev) => {
    ev.stopPropagation();
  };

  const getRating = () => {
    let array = [];
    let total = 0;
    let rating = 0;

    if (item.reviews) {
      item?.reviews.forEach((review) => {
        array.push(review.rating);
        total += review.rating * 1;
      });

      rating = total / array.length;
    }

    return rating;
  };

  return (
    <div
      className="related-card"
      onClick={() => {
        navigate(`/${item.title
          .replaceAll(" ", "-")
          .replaceAll(".", ",")
          .replaceAll("/", "OR")}`, {
          state: { item },
        });
      }}
    >
      <img src={item.images[0]} alt="camera" />
      <div className="item-details">
        <h3 className="title">{item.title}</h3>

        <h3 className="price">N$ {toCurrency(item.price)}</h3>

        <div className="rating">
          <Rating
            fillColor="red"
            size={17}
            allowFraction={true}
            allowHover={false}
            initialValue={getRating()}
            className="stars"
          />
        </div>

        <div className="item-buttons">
          <IconWithTooltip name="heart-outline" text="Add to Wishlist" className='icon' item={item}/>
        </div>
      </div>

      <div className="add-to-cart" onClick={doNothing}>
        <button className="atc" onClick={addToCart}>
          <IonIcon name="cart" className="cart" /> Add to cart
        </button>
      </div>
    </div>
  );
}

export default RelatedCard;
