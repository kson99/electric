import React from 'react'
import './information.css'

function Information() {
    return (
        <div className="information">
            <div className="c-o-contact">
                <h3>Contact</h3>

                <div className="field">
                    <span>Email</span>
                    <input type="email" placeholder="example@email.com" />
                </div>

                <div className="field">
                    <span>Phone number</span>
                    <input type="number" placeholder="264 81 123 4567" />
                </div>
            </div>

            <div className="shipping-address">
                <h3>Shipping address</h3>

                <div className="field">
                    <span>Country/Region</span>
                    <select>
                        <option value="Namibia">Namibia</option>
                    </select>
                </div>

                <div className="fields">
                    <div className="field">
                        <span>First name</span>
                        <input type="text" placeholder="John..." />
                    </div>

                    <div className="field">
                        <span>Last Name</span>
                        <input type="text" placeholder="Doe..." />
                    </div>
                </div>

                <div className="field">
                    <span>Address</span>
                    <input type="text" placeholder="Address" />
                </div>

                <div className="field">
                    <span>Apartment, suit, etc</span>
                    <input type="text" placeholder="Apartment, suit, etc" />
                </div>

                <div className="fields">
                    <div className="field">
                        <span>City</span>
                        <input type="text" placeholder="City" />
                    </div>

                    <div className="field">
                        <span>Postal code (optional)</span>
                        <input type="text" placeholder="Postal code (optional)" />
                    </div>
                </div>

            </div>

            <div className="buttons">
                <button>return to cart</button>
                <button className="submitBtn">Proceed to Payment</button>
            </div>

        </div>
    )
}

export default Information