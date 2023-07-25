import React, { useContext, useState } from "react";
import "./reviews.css";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import { appContext, url } from "../../App";

function Reviews({ item }) {
  const { refleshCtx } = useContext(appContext);
  const [reflesh, setReflesh] = refleshCtx;

  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const form = document.getElementById("reviewForm");

  const handleRating = (rate) => {
    setRating(rate);
  };

  const submitReview = async (ev) => {
    ev.preventDefault();

    await axios
      .put(url + "/products/review", {
        id: item._id,
        reviews: item.reviews
          ? [
              ...item.reviews,
              {
                rating: rating,
                name: ev.target.name.value,
                review: ev.target.review.value,
              },
            ]
          : [
              {
                rating: rating,
                name: ev.target.name.value,
                review: ev.target.review.value,
              },
            ],
      })
      .then((res) => {
        if (form !== null) {
          form.reset();
          setRating(0);
        }
        setMessage("Review submitted");
        setReflesh(reflesh + 1);

        setTimeout(() => {
          setMessage("");
        }, 1500);
      });
  };

  return (
    <div className="reviews">
      <div className="reviews-list">
        <h3>Reviews ({item.reviews ? item?.reviews.length : 0})</h3>
        <div className="revws">
          {item.reviews &&
            item.reviews.map((review, i) => (
              <div className="review" key={i}>
                <div>
                  <div className="avatar">
                    <p>{review.name.charAt(0).toUpperCase()}</p>
                  </div>

                  <div className="details">
                    <p>{review.name}</p>
                    <p>{review.review}</p>
                  </div>
                </div>

                <Rating
                  fillColor="red"
                  size={17}
                  allowFraction={true}
                  allowHover={false}
                  initialValue={review?.rating}
                  className="stars"
                />
              </div>
            ))}
        </div>
      </div>

      <form onSubmit={submitReview} id="reviewForm" className="leave-review">
        <h3>Leave a Review</h3>
        <Rating
          onClick={handleRating}
          allowFraction={true}
          initialValue={rating}
        />
        <input type="text" name="name" placeholder="name" required />
        <textarea
          name="review"
          id=""
          cols="30"
          rows="10"
          placeholder="wriite review here"
          required
        ></textarea>

        <div className="buttons">
          <button className="submitBtn" type="submit">
            Submit
          </button>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
}

export default Reviews;
