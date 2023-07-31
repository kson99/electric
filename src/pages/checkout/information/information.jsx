import React, { useState } from "react";
import "./information.css";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function Information({ setDone }) {
  const info = JSON.parse(localStorage.getItem("information"));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const saveInfo = (ev) => {
    ev.preventDefault();
    setLoading(true);

    let data = {
      recipient: `${ev.target.first_name.value} ${ev.target.last_name.value}`,
      address: {
        country: ev.target.country.value,
        city: ev.target.city.value,
        address: ev.target.address.value,
        suit: ev.target.suit.value,
        zip: ev.target.ZIP.value,
      },
      contact: {
        email: ev.target.email.value,
        number: ev.target.number.value,
      },
    };

    localStorage.setItem("information", JSON.stringify(data));
    setTimeout(() => {
      setLoading(false);
      setDone("payment");
    }, 500);
  };

  return (
    <form onSubmit={saveInfo} className="information">
      <div className="c-o-contact">
        <h3>Contact</h3>

        <div className="field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            defaultValue={info?.contact.email}
            required
          />
        </div>

        <div className="field">
          <span>Phone number</span>
          <input
            type="number"
            name="number"
            placeholder="264 81 123 4567"
            defaultValue={info?.contact.number}
            required
          />
        </div>
      </div>

      <div className="shipping-address">
        <h3>Shipping address</h3>

        <div className="field">
          <span>Country/Region</span>
          <select name="country" required>
            <option value="Namibia">Namibia</option>
          </select>
        </div>

        <div className="fields">
          <div className="field">
            <span>First name</span>
            <input
              type="text"
              name="first_name"
              placeholder="John..."
              defaultValue={info?.recipient.split(" ")[0]}
              required
            />
          </div>

          <div className="field">
            <span>Last Name</span>
            <input
              type="text"
              name="last_name"
              placeholder="Doe..."
              defaultValue={info?.recipient.split(" ")[1]}
              required
            />
          </div>
        </div>

        <div className="field">
          <span>Address</span>
          <input
            type="text"
            name="address"
            placeholder="Address"
            defaultValue={info?.address.address}
            required
          />
        </div>

        <div className="field">
          <span>Apartment, suit, etc</span>
          <input
            type="text"
            name="suit"
            placeholder="Apartment, suit, etc"
            defaultValue={info?.address.suit}
            required
          />
        </div>

        <div className="fields">
          <div className="field">
            <span>City</span>
            <input
              type="text"
              name="city"
              placeholder="City"
              defaultValue={info?.address.city}
              required
            />
          </div>

          <div className="field">
            <span>Postal code (optional)</span>
            <input
              type="text"
              name="ZIP"
              placeholder="Postal code (optional)"
              defaultValue={info?.address.zip}
            />
          </div>
        </div>
      </div>

      <div className="buttons">
        <button
          type="button"
          className="returnBtn"
          onClick={() => navigate("/cart")}
        >
          Return to cart
        </button>
        <button type="submit" className="submitBtn">
          {loading ? <BeatLoader color="white" /> : "Proceed to Payment"}
        </button>
      </div>
    </form>
  );
}

export default Information;
