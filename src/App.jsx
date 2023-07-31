import { createContext, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/home";
import { CartPopup, Footer, Navbar } from "./components";
import ItemView from "./pages/item-view/item-view";
import Admin from "./admin/admin";
import Sidebar from "./admin/sidebar/sidebar";
import Dashboard from "./admin/dashboard/dashboard";
import Products from "./admin/products/products";
import Categories from "./admin/categories/categories";
import Settings from "./admin/settings/settings";
import Admins from "./admin/admins/admins";
import Orders from "./admin/orders/orders";
import EditProduct from "./admin/products/edit/edit-product";
import CreateProduct from "./admin/products/create/create-product";
import axios from "axios";
import ProductsView from "./pages/products-view/products-view";
import Search from "./pages/search/search";
import Checkout from "./pages/checkout/checkout";
import CheckedOut from "./pages/checked-out/checked-out";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Cart from "./pages/cart/cart";

export const appContext = createContext();
export const url = "https://byzantium-scorpion-cap.cyclic.app";

function App() {
  const { pathname } = useLocation();

  const [isAdmin, setIsAdmin] = useState(false);
  const [ischeckout, setIsCheckout] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState({});
  const [orders, setOrders] = useState([]);
  const [reflesh, setReflesh] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

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
    await axios.get(url + "/products").then((res) => {
      setProducts(res.data.reverse());
    });

    await axios.get(url + "/categories").then((res) => {
      setCategories(res.data);
    });

    await axios.get(url + "/settings").then((res) => {
      setSettings(res.data[0]);
    });

    setDataLoading(false);

    setCartProducts((prev) => {
      const array = JSON.parse(localStorage.getItem("cart")) || [];
      return array;
    });
  };

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
          ordersCtx: [orders, setOrders],
          refleshCtx: [reflesh, setReflesh],
          dataLoading: dataLoading,
          cartCtx: {
            cartProducts,
            setCartProducts,
            openCart,
            setOpenCart,
          },
        }}
      >
        <SkeletonTheme
          baseColor="#f1f1f1"
          highlightColor="white"
          direction="right"
        >
          {ischeckout ? "" : isAdmin ? <Sidebar /> : <Navbar />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<ItemView />} />
            <Route path="/products" element={<ProductsView />} />
            <Route path="/search" element={<Search />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/check-out-status" element={<CheckedOut />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/products/edit" element={<EditProduct />} />
            <Route path="/admin/products/create" element={<CreateProduct />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/admins" element={<Admins />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Routes>

          {!isAdmin && !ischeckout && <Footer />}
          <CartPopup />
        </SkeletonTheme>
      </appContext.Provider>
    </div>
  );
}

export default App;
