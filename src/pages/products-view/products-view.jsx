import React, { useContext, useState } from "react";
import "./products-view.css";
import { useLocation } from "react-router-dom";
import { appContext } from "../../App";
import { NewItemCard } from "../../components";
import { BeatLoader } from "react-spinners";

function ProductsView() {
  const { products, categories, dataLoading } = useContext(appContext);
  const { state } = useLocation();
  const [sortBy, setSortBy] = useState("new-old");

  const getProducts = () => {
    let array = [];

    if (state.name === "All") {
      array = [...products];
    } else if (state.name === "search") {
      products.map((p) => {
        if (p.title.toLowerCase().includes(state.searchTxt.toLowerCase())) {
          array.push(p);
        }
      });
    } else {
      const cat_id = state._id;
      const children = [];

      categories.map((cat) => {
        if (cat.parent === cat_id) {
          children.push(cat._id);
        }
      });

      products.map((p) => {
        if (p.category === cat_id) {
          array.push(p);
        }
        children.map((c) => {
          if (p.category === c) {
            array.push(p);
          }
        });
      });
    }

    return array;
  };

  const sortedProducts = () => {
    let array = [];

    switch (sortBy) {
      case "new-old":
        array = getProducts();
        break;
      case "low-high":
        array = sortByPrice();
        break;
      case "high-low":
        array = sortByPrice().reverse();
        break;
      case "old-new":
        array = getProducts().reverse();
        break;

      default:
        break;
    }

    return array;
  };

  const sortByPrice = () => {
    let array = [];
    let obj = {};

    getProducts().forEach((p) => {
      obj[p.price * 1] = p;
    });

    Object.keys(obj).forEach((key) => {
      array.push(obj[key]);
    });

    return array;
  };

  return (
    <div className="products-view">
      <div className="max-width">
        <div className="pv-cont">
          <div className="header">
            {state.name === "All" ? (
              <b>All products</b>
            ) : state.name === "search" ? (
              <p>
                Results for:
                <b> {state.searchTxt}</b>
              </p>
            ) : (
              <p>
                Category:
                <b> {state.name}</b>
              </p>
            )}

            <div className="filters">
              <div className="proparty">
                <div className="select">
                  <select id="" onChange={(e) => setSortBy(e.target.value)}>
                    <option value="new-old">Date: New to Old</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="old-new">Date: Old to New</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pv-products">
            {sortedProducts().map((product) => (
              <NewItemCard item={product} key={product._id} />
            ))}

            {sortedProducts().length === 0 && (
              <p id="no-results">
                {dataLoading ? (
                  <BeatLoader color="#252525" />
                ) : (
                  "No Items Found"
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsView;
