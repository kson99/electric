import React, { useContext, useState } from "react";
import "./cart-popup.css";
import IonIcon from "@reacticons/ionicons";
import CartCard from "../cards/cart-card/cart-card";
import { Link, useNavigate } from "react-router-dom";
import { toCurrency } from "../../utils";
import { appContext } from "../../grobal/context";

function CartPopup() {
	const { cartCtx, products } = useContext(appContext);
	const { cartProducts, openCart, setOpenCart } = cartCtx;

	const navigate = useNavigate();
	const [subtotal, setSubtotal] = useState({});
	const [checkoutProducts, setCheckoutProducts] = useState({});
	const [closing, setClosing] = useState(false);

	const getCartProducts = () => {
		let _products = [];

		cartProducts.map((prod) => {
			const pItem = products.find(({ _id }) => _id === prod);
			_products.push(pItem);
		});

		return _products;
	};

	const closeCart = () => {
		setClosing(true);
		setTimeout(() => {
			setOpenCart(false);
			setClosing(false);
		}, 300);
	};

	const getSubtotal = () => {
		let _subtotal = 0;

		Object.keys(subtotal).forEach((key, index) => {
			_subtotal += subtotal[key];
		});

		return _subtotal;
	};

	const checkout = () => {
		closeCart();
		navigate("/checkout", {
			state: {
				total: getSubtotal(),
				cartData: checkoutProducts,
			},
		});
	};

	const goToCart = () => {
		closeCart();
		navigate("/cart");
	};

	return (
		openCart && (
			<div className="cart-popup" onClick={closeCart}>
				<div
					className={closing ? "cart-cont closing" : "cart-cont"}
					onClick={(e) => e.stopPropagation()}>
					<div className="header">
						<h4>Shopping Cart ({cartProducts.length})</h4>
						<IonIcon
							name="close"
							className="icon"
							onClick={closeCart}
						/>
					</div>

					<div className="body">
						{getCartProducts().map((item) => (
							<CartCard
								key={item._id}
								item={item}
								setSubtotal={setSubtotal}
								setProducts={setCheckoutProducts}
							/>
						))}
					</div>

					<div className="foot">
						{cartProducts.length > 0 ? (
							<div className="checkout">
								<div className="sub-tot">
									<p>Sub-Total</p>
									<p>N$ {toCurrency(getSubtotal())}</p>
								</div>
								<textarea placeholder="Order note"></textarea>
								<p>Shipping and Taxes calculated at checkout</p>
								<button
									className="submitBtn"
									onClick={checkout}>
									<IonIcon name="lock-closed" />
									<p>Checkout</p>
								</button>

								<p onClick={goToCart} id="to-cart">
									Go to Cart
								</p>
							</div>
						) : (
							<div className="cart-empty">
								<IonIcon name="cart" className="icon" />
								Your Cart is Empty
							</div>
						)}
					</div>
				</div>
			</div>
		)
	);
}

export default CartPopup;
