import { createContext, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
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

export const appContext = createContext();

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reflesh, setReflesh] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  const onHrefChange = () => {
    if (window.location.href.includes("/admin")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const getData = async () => {
    await axios
      .get("https://byzantium-scorpion-cap.cyclic.app/products")
      .then((res) => {
        setProducts(res.data);
      });

    await axios
      .get("https://byzantium-scorpion-cap.cyclic.app/categories")
      .then((res) => {
        setCategories(res.data);
      });

    setCartProducts((prev) => {
      const array = JSON.parse(localStorage.getItem("cart")) || [];
      return array;
    });
  };

  useEffect(() => {
    onHrefChange();
  }, [window.location.href]);

  useEffect(() => {
    getData();
  }, [reflesh]);

  return (
    <div className="app">
      <appContext.Provider
        value={{
          products,
          categories,
          refleshCtx: [reflesh, setReflesh],
          cartCtx: {
            cartProducts,
            setCartProducts,
            openCart,
            setOpenCart,
          },
        }}
      >
        {isAdmin ? <Sidebar /> : <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ItemView />} />
          <Route path="/products" element={<ProductsView />} />
          <Route path="/search" element={<Search />} />

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
        {!isAdmin && <Footer />}
        <CartPopup />
      </appContext.Provider>
    </div>
  );
}

export default App;
