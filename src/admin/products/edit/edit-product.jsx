import React, { useContext, useState } from "react";
import "./edit-product.css";
import { useLocation, useNavigate } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { appContext } from "../../../App";

function EditProduct() {
  const { refleshCtx, categories } = useContext(appContext);
  const [reflesh, setReflesh] = refleshCtx;

  const { state } = useLocation();
  const navigate = useNavigate();

  const [images, setImages] = useState([...state?.images] || []);
  const [category, setCategory] = useState(state?.category || "");
  const [properties, setProperties] = useState(state?.properties || {});

  const onSave = async (ev) => {
    ev.preventDefault();

    let data = {
      title: ev.target.title.value,
      description: ev.target.description.value,
      price: ev.target.price.value,
      category: ev.target.category.value,
      properties,
      images: [...images],
    };

    await axios
      .put("http://localhost:3001/products/update", {
        ...data,
        id: state._id,
      })
      .then(() => {
        setReflesh(reflesh + 1);
        navigate("/admin/products");
      });
  };

  const imagesUpdateOrder = (images) => {
    setImages(images);
  };

  const assignProdProperties = (pName, pValue) => {
    setProperties((prev) => {
      let prop = { ...prev };
      prop[pName.trim()] = pValue.trim();
      return prop;
    });
  };

  const populateImageArray = async (file) => {
    const base64 = await convertToBase64(file);
    let imgUrl = base64.toString();

    setImages((prev) => {
      return [...prev, imgUrl];
    });
  };

  const convertToBase64 = (img) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const propertiesContent = [];
  if (categories.length > 0 && category !== "") {
    const selectedCategory = categories.find(({ _id }) => _id === category);
    propertiesContent.push(...selectedCategory.properties);

    if (selectedCategory.parent !== "") {
      const parent = categories.find(
        ({ _id }) => _id === selectedCategory.parent
      );
      propertiesContent.push(...parent.properties);
    }
  }

  return (
    <div className="edit-product a-page">
      <div className="ep-cont cont">
        <h1>Edit Product</h1>

        <form onSubmit={onSave} className="prod-fields">
          <div className="field">
            <p>Product Name</p>
            <input
              type="text"
              defaultValue={state.title}
              name="title"
              required
            />
          </div>

          <div className="field">
            <p>Category</p>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value=""> -- No category -- </option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {propertiesContent.map((p, i) => (
            <div className="field" key={i}>
              <p>{p.name.trim()}</p>
              <select
                name="color"
                value={properties[p.name.trim()]}
                onChange={(e) => assignProdProperties(p.name, e.target.value)}
              >
                {p.values.split(",").map((value, _i) => (
                  <option key={_i} value={value.trim()}>
                    {value.trim()}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="field">
            <p>Images</p>
            <div className="images">
              <ReactSortable
                list={images}
                setList={imagesUpdateOrder}
                className="images"
              >
                {images?.map((image, i) => (
                  <div className="image" key={i}>
                    <img src={image} alt="" />
                  </div>
                ))}
              </ReactSortable>

              <label
                className="add-image"
                style={{
                  display: images.length === 5 ? "none" : "flex",
                }}
              >
                <IonIcon name="cloud-upload-outline" className="icon" />
                <p>Add image</p>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => populateImageArray(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <div className="field">
            <p>Description</p>
            <textarea
              name="description"
              cols="30"
              rows="10"
              defaultValue={state.description}
            ></textarea>
          </div>

          <div className="field">
            <p>Price (in N$)</p>
            <input
              type="number"
              name="price"
              defaultValue={state.price}
              required
            />
          </div>

          <button type="submit" className="submitBtn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
