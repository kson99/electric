import React, { useContext, useState } from "react";
import "./product-list-card.css";
import IonIcon from "@reacticons/ionicons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { appContext, url } from "../../../App";
import ErrorToast from "../../errorToast/errorToast";

function ProductListCard({ item }) {
  const { refleshCtx, userId } = useContext(appContext);
  const [reflesh, setReflesh] = refleshCtx;

  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const editProducts = () => {
    navigate("/admin/products/edit", { state: item });
  };

  const deleteProduct = async (id) => {
    try {
      await axios
        .delete(url + "/products/delete", { data: { id, userId } })
        .then(() => {
          setReflesh(reflesh + 1);
        });
    } catch (error) {
      setIsError(true);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="product-list-card">
      <ErrorToast trigger={isError} setTrigger={setIsError} error={error} />
      {!isDeleting ? (
        <>
          <div className="prod-details p-col">
            <img src={item?.images[0]} alt="" />
            <h3 className="title">{item.title}</h3>
          </div>

          <div className="prod-crud p-col">
            <div onClick={() => editProducts()}>
              <IonIcon name="create-outline" className="icon" />
              <p>Edit</p>
            </div>

            <div onClick={() => setIsDeleting(true)}>
              <IonIcon name="trash-outline" className="icon" />
              <p>Delete</p>
            </div>
          </div>
        </>
      ) : (
        <div className="confirmation">
          <h3>Are you sure ?</h3>
          <div className="choices">
            <button id="cancel" onClick={() => setIsDeleting(false)}>
              Cancel
            </button>
            <button id="delete" onClick={() => deleteProduct(item._id)}>
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductListCard;
