import React from 'react'
import './payment.css'

function Payment() {
    return (
        <div className="payment">
            <div className="fields">
                <label>
                    Email:
                    <input type="email" placeholder="example@email.com" />
                </label>
                <div className="seperator"></div>
                <label>
                    Phone:
                    <input type="number" placeholder="264 81 123 4567" />
                </label>
                <div className="seperator"></div>
                <label>
                    Ship to:
                    <input type="number" placeholder="264 81 123 4567" />
                </label>
                <div className="seperator"></div>
                <label>
                    Method:
                    <input type="number" placeholder="264 81 123 4567" />
                </label>
            </div>

            <div className="payment-type">
                <div>
                    <h3>Payment</h3>
                    <p>All transactions are secure and encrypted</p>
                </div>

                <div className="paygate">
                    <div className="header">
                        <img src="./paygate.png" alt="" />
                        <div className="cards">
                            <img src="./visa.jpg" alt="" />
                            <img src="./mastercard.png" alt="" />
                        </div>
                    </div>

                    <div className="cards-info">
                        <img src="/card.png" alt="" />
                        <p>After clicking “Complete order”, you will be redirected to PayGate to complete your purchase securely.</p>
                    </div>
                </div>

                <div className="buttons">
                    <button>return to information</button>
                    <button className="submitBtn">Complete order</button>
                </div>
            </div>
        </div>
    )
}

export default Payment