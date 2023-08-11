import { createContext, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/home";
import { CartPopup, ErrorToast, Footer, Navbar, QuickView } from "./components";
import ItemView from "./pages/item-view/item-view";
import Admin from "./admin/admin";
import Sidebar from "./admin/sidebar/sidebar";
import Dashboard from "./admin/dashboard/dashboard";
import Products from "./admin/products/products";
import Categories from "./admin/categories/categories";
import Settings from "./admin/settings/settings";
import Orders from "./admin/orders/orders";
import EditProduct from "./admin/products/edit/edit-product";
import CreateProduct from "./admin/products/create/create-product";
import axios from "axios";
import ProductsView from "./pages/products-view/products-view";
import Checkout from "./pages/checkout/checkout";
import CheckedOut from "./pages/checked-out/checked-out";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Cart from "./pages/cart/cart";
import Wishlist from "./pages/wishlist/wishlist";
import Login from "./admin/login/login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.setup";
import NotFound from "./pages/not-found/not-found";

export const appContext = createContext();
export const url = "https://byzantium-scorpion-cap.cyclic.app";

function App() {
	const { pathname } = useLocation();

	const [isAdmin, setIsAdmin] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [ischeckout, setIsCheckout] = useState(false);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [settings, setSettings] = useState({});
	const [orders, setOrders] = useState([]);
	const [reflesh, setReflesh] = useState(0);
	const [userId, setUseId] = useState("");
	const [error, setError] = useState("");
	const [isError, setIsError] = useState(false);
	const [cartProducts, setCartProducts] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [openCart, setOpenCart] = useState(false);
	const [quickView, setQuickView] = useState(false);
	const [dataLoading, setDataLoading] = useState(false);
	const [quickViewProduct, setQuickViewProduct] = useState({});

	const onHrefChange = () => {
		if (pathname.includes("/admin")) {
			setIsAdmin(true);
		} else {
			setIsAdmin(false);
		}

		if (pathname.includes("/checkout")) {
			setIsCheckout(true);
		} else {
			setIsCheckout(false);
		}
	};

	const getData = async () => {
		setDataLoading(true);
		let _products = [];
		try {
			await axios.get(url + "/products").then((res) => {
				setProducts(res.data.reverse());
				_products = [...res.data];
			});

			await axios.get(url + "/categories").then((res) => {
				setCategories(res.data);
			});

			await axios.get(url + "/settings").then((res) => {
				setSettings(res.data[0]);
			});
		} catch (error) {
			setIsError(true);
			setError("Something went wrong!");
		}

		setDataLoading(false);

		setCartProducts((prev) => {
			const array = [];
			const temp = JSON.parse(localStorage.getItem("cart")) || [];

			temp.map((t) => {
				const item = _products.find(({ _id }) => _id === t);
				if (item) {
					array.push(item._id);
				}
			});

			return array;
		});

		setWishlist((prev) => {
			const array = [];
			const temp = JSON.parse(localStorage.getItem("wishlist")) || [];

			temp.map((t) => {
				const item = _products.find(({ _id }) => _id === t);
				if (item) {
					array.push(item._id);
				}
			});

			return array;
		});
	};

	const isUserSignedIn = () => {
		onAuthStateChanged(auth, (user) => {
			if (user != null) {
				// User is signed in
				setIsLoggedIn(true);
				setUseId(user.uid);
			} else {
				// User is signed out
				setIsLoggedIn(false);
			}
		});
	};

	useEffect(() => {
		isUserSignedIn();
	}, []);

	useEffect(() => {
		onHrefChange();
		window.scrollTo(0, 0);
	}, [pathname]);

	useEffect(() => {
		getData();
	}, [reflesh]);

	return (
		<div className="app">
			<appContext.Provider
				value={{
					products,
					categories,
					settings,
					userId,
					dataLoading: dataLoading,
					ordersCtx: [orders, setOrders],
					refleshCtx: [reflesh, setReflesh],
					wishlistCtx: [wishlist, setWishlist],

					quickViewCtx: {
						quickView,
						setQuickView,
						setQuickViewProduct,
						quickViewProduct,
					},

					cartCtx: {
						cartProducts,
						setCartProducts,
						openCart,
						setOpenCart,
					},
				}}>
				<SkeletonTheme
					baseColor="#f1f1f1"
					highlightColor="white"
					direction="right">
					{ischeckout ? "" : isAdmin ? <Sidebar /> : <Navbar />}

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/:id" element={<ItemView />} />
						<Route path="/products" element={<ProductsView />} />
						<Route path="/checkout" element={<Checkout />} />
						<Route
							path="/check-out-status"
							element={<CheckedOut />}
						/>
						<Route path="/cart" element={<Cart />} />
						<Route path="/wishlist" element={<Wishlist />} />

						{!isLoggedIn && (
							<Route path="/admin" element={<Login />} />
						)}

						{/*Dashbord paths  */}
						{isLoggedIn && (
							<Route path="/admin">
								<Route index element={<Admin />} />
								<Route
									path="dashboard"
									element={<Dashboard />}
								/>
								<Route path="products" element={<Products />} />
								<Route
									path="products/edit"
									element={<EditProduct />}
								/>
								<Route
									path="products/create"
									element={<CreateProduct />}
								/>
								<Route
									path="categories"
									element={<Categories />}
								/>
								<Route path="settings" element={<Settings />} />
								<Route path="orders" element={<Orders />} />
							</Route>
						)}

						<Route path="*" element={<NotFound />} />
					</Routes>

					{!isAdmin && !ischeckout && <Footer />}
					{quickView && <QuickView />}
					{isError && (
						<ErrorToast
							trigger={isError}
							setTrigger={setIsError}
							error={error}
						/>
					)}
					<CartPopup />
				</SkeletonTheme>
			</appContext.Provider>
		</div>
	);
}

export default App;
