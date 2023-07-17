import React, { useContext } from "react";
import "./products.css";
import { ProductListCard } from "../../components";
import { data } from "../../assets";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../App";

function Products() {
  const navigate = useNavigate();
  const { products } = useContext(appContext);

  // console.log(products);

  const addNewProduct = () => {
    navigate("/admin/products/create");
  };

  return (
    <div className="products a-page">
      <div className="prod-cont cont">
        <div className="header">
          <h2>Products</h2>
          <button onClick={addNewProduct}>Add new Product</button>
        </div>

        <div className="products-list">
          {products.map((item) => (
            <ProductListCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
