import React, { useState } from "react";
import "./reviews.css";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import { url } from "../../App";

function Reviews({ item }) {
  const [rating, setRating] = useState();

  const handleRating = (rate) => {
    setRating(rate);
  };

  const submitReview = async (ev) => {
    ev.preventDefault();

    await axios
      .put(url + "/producst/review", {
        id: item._id,
        reviews: [
          {
            rating: rating,
            name: ev.target.name.value,
            review: ev.target.review.value,
          },
        ],
      })
      .then((res) => {
        console.log("complete");
      });
  };

  return (
    <div className="reviews">
      <div className="reviews-list">
        <h3>Reviews ({0})</h3>
      </div>

      <form onSubmit={submitReview} className="leave-review">
        <h3>Leave a Review</h3>
        <Rating onClick={handleRating} />
        <input type="text" name="name" placeholder="name" required />
        <textarea
          name="review"
          id=""
          cols="30"
          rows="10"
          placeholder="wriite review here"
        ></textarea>

        <div className="buttons">
          <button className="submitBtn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Reviews;
