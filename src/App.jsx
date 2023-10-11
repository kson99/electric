import { createContext, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/home";
import { CartPopup, Navbar } from "./components";
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
import Context from "./grobal/context";

function App() {
  const { pathname } = useLocation();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [userId, setUseId] = useState("");

  const onHrefChange = () => {
    if (pathname.includes("/admin")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    if (pathname.includes("/checkout")) {
      console.log("ischeckout: ", pathname);
      setIsCheckout(true);
    } else {
      setIsCheckout(false);
    }
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

  return (
    <div className="app">
      <Context userId={userId} isAdmin={isAdmin} isCheckout={isCheckout}>
        <SkeletonTheme
          baseColor="#f1f1f1"
          highlightColor="white"
          direction="right"
        >
          {isCheckout ? "" : isAdmin ? <Sidebar /> : <Navbar />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ItemView />} />
            <Route path="/products" element={<ProductsView />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/check-out-status" element={<CheckedOut />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />

            {!isLoggedIn && <Route path="/admin" element={<Login />} />}

            {/*Dashbord paths  */}
            {isLoggedIn && (
              <Route path="/admin">
                <Route index element={<Admin />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="products/edit" element={<EditProduct />} />
                <Route path="products/create" element={<CreateProduct />} />
                <Route path="categories" element={<Categories />} />
                <Route path="settings" element={<Settings />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            )}

            <Route path="*" element={<NotFound />} />
          </Routes>
          <CartPopup />
        </SkeletonTheme>
      </Context>
    </div>
  );
}

export default App;
