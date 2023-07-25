import React, { useContext } from "react";
import "./products.css";
import { ProductListCard, ProductListCardSkel } from "../../components";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../App";

function Products() {
  const navigate = useNavigate();
  const { products, dataLoading } = useContext(appContext);

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
          {dataLoading && <ProductListCardSkel count={10} />}
          {products.map((item) => (
            <ProductListCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
