import React, { useContext, useState } from "react";
import "./reviews.css";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import { appContext, url } from "../../App";
import Loader from "../../admin/products/loader/loader";
import { BeatLoader } from "react-spinners";
import ErrorToast from "../errorToast/errorToast";

function Reviews({ item }) {
  const { refleshCtx } = useContext(appContext);
  const [reflesh, setReflesh] = refleshCtx;

  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const form = document.getElementById("reviewForm");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const submitReview = async (ev) => {
    ev.preventDefault();
    setLoading(true);

    try {
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
  
          setLoading(false);
          setMessage("Review submitted");
          setReflesh(reflesh + 1);
  
          setTimeout(() => {
            setMessage("");
          }, 1500);
        });
    } catch (error) {
      setLoading(false);
        setIsError(true);
        setError("Something went wrong!");
    }

  };

  return (
    <div className="reviews">
      <div className="reviews-list">
      <ErrorToast trigger={isError} setTrigger={setIsError} error={error} />
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
            {loading ? <BeatLoader color="white" /> : "Submit"}
          </button>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
}

export default Reviews;
