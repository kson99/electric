import React, { useContext } from "react";
import "./wishlist.css";
import { appContext } from "../../App";
import { toCurrency } from "../../utils";
import IonIcon from "@reacticons/ionicons";
import { Link } from "react-router-dom";

function Wishlist() {
	const { products, wishlistCtx, cartCtx } = useContext(appContext);
	const [wishlist, setWishlist] = wishlistCtx;
	const { setCartProducts, setOpenCart, cartProducts } = cartCtx;

	const getWishlistProducts = () => {
		let _products = [];

		wishlist.map((prod) => {
			const pItem = products.find(({ _id }) => _id === prod);
			_products.push(pItem);
		});

		return _products;
	};

	const isInCart = (item) => {
		let is = false;

		if (cartProducts.includes(item?._id.toString())) {
			is = true;
		}

		return is;
	};

	const addToCart = (item) => {
		setCartProducts((prev) => {
			let array = [...prev];
			array.indexOf(item._id) === -1 && array.push(item._id);

			localStorage.setItem("cart", JSON.stringify(array));
			return array;
		});

		setOpenCart(true);
	};

	const removeFromWishlist = (_id) => {
		setWishlist((prev) => {
			let newArray = [...prev].filter((id) => id !== _id);
			localStorage.setItem("wishlist", JSON.stringify(newArray));
			return newArray;
		});
	};

	return (
		<div className="wishlist">
			<div className="max-width">
				<div className="w-cont">
					<h2>WishList</h2>

					{wishlist.length > 0 ? (
						<table>
							<thead>
								<tr>
									<th>Products</th>
									<th>Price</th>
									<th />
									<th />
								</tr>
							</thead>
							<tbody>
								{getWishlistProducts().map((product) => (
									<tr key={product._id} className="item-row">
										<td className="img-name">
											<img
												src={product.images[0]}
												alt=""
											/>
											<p>{product.title}</p>
										</td>
										<td>N$ {toCurrency(product.price)}</td>
										<td>
											{isInCart(product) ? (
												""
											) : (
												<button
													onClick={() =>
														addToCart(product)
													}>
													Add to Cart
												</button>
											)}
										</td>
										<td
											className="close"
											onClick={() =>
												removeFromWishlist(product._id)
											}>
											<IonIcon
												name="close-circle"
												className="icon"
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div className="empty-wishlist">
							<IonIcon name="heart" className="icon" />
							Your Wishlist is Empty
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Wishlist;
