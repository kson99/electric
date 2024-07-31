import { ErrorToast, Footer, QuickView } from "../components";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const appContext = createContext();
export const url = "https://projectsmegaserver.onrender.com/electric";
// export const url = "https://perfect-cuff-links-lamb.cyclic.cloud/electric";
// export const url = "http://localhost:3001/electric";

const Context = ({ children, isAdmin, isCheckout, userId }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState({});
  const [orders, setOrders] = useState([]);
  const [reflesh, setReflesh] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState({});

  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [quickView, setQuickView] = useState(false);

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

  useEffect(() => {
    getData();
  }, [reflesh]);

  return (
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
      }}
    >
      {children}

      {!isAdmin && !isCheckout && <Footer />}
      {quickView && <QuickView />}
      {isError && (
        <ErrorToast trigger={isError} setTrigger={setIsError} error={error} />
      )}
    </appContext.Provider>
  );
};

export default Context;
