import React, { useContext } from "react";
import "./products-view.css";
import { useLocation } from "react-router-dom";
import { appContext } from "../../App";
import { NewItemCard } from "../../components";
import IonIcon from "@reacticons/ionicons";

function ProductsView() {
  const { products, categories } = useContext(appContext);
  const { state } = useLocation();

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

  const getCategoryProparties = () => {
    let array = [];

    if (state.name !== "All") {
      categories.map((c) => {
        if (c._id === state._id) {
          array.push(...c.properties);
        }
      });
    }
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
              {/* {getCategoryProparties().map((prop, i) => (
                <div className="proparty" key={i}>
                  <p>{prop.name}:&nbsp;&nbsp;</p>
                  <select id="">
                    <option value="">All</option>
                    {prop.values.split(",").map((val, _i) => (
                      <option value={val} key={_i}>
                        {val}
                      </option>
                    ))}
                  </select>
                  <IonIcon name="chevron-down" />
                </div>
              ))} */}
              <div className="proparty">
                <div className="select">
                  <select id="">
                    <option value="newest">Price: Low to High</option>
                    <option value="newest">Price: High to Low</option>
                    <option value="newest">Date: New to Old</option>
                    <option value="newest">Date: Old to New</option>
                  </select>
                </div>
                {/* <IonIcon name="chevron-down" /> */}
              </div>
            </div>
          </div>

          <div className="pv-products">
            {getProducts().map((product) => (
              <NewItemCard item={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsView;
