import axios from "axios";
import "./create-product.css";
import IonIcon from "@reacticons/ionicons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSortable } from "react-sortablejs";
import { appContext } from "../../../App";

function CreateProduct() {
  const { refleshCtx, categories } = useContext(appContext);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [reflesh, setReflesh] = refleshCtx;

  const [category, setCategory] = useState("");
  const [productProperties, setProductProperties] = useState({});

  const imagesUpdateOrder = (images) => {
    setImages(images);
  };

  const uploadProduct = async (ev) => {
    ev.preventDefault();

    if (ev.target.category.value === "") {
      setProductProperties({});
    }

    let _properties = {};
    if (Object.keys(productProperties).length === 0) {
      properties.map((p) => {
        _properties[p.name] = p.values.split(",")[0].trim();
      });
    } else {
      _properties = productProperties;
    }

    let data = {
      title: ev.target.title.value,
      description: ev.target.description.value,
      price: ev.target.price.value,
      category: ev.target.category.value,
      properties: _properties,
      images: [...images],
    };

    await axios
      .post("http://localhost:3001/products/upload", data)
      .then((res) => {
        setReflesh(reflesh + 1);
        navigate(-1);
      });
  };

  const assignProdProperties = (pName, pValue) => {
    setProductProperties((prev) => {
      let p = { ...prev };
      p[pName] = pValue.trim();
      return p;
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

  const properties = [];
  if (category !== "" && categories.length > 0) {
    const selectedCat = categories.find(({ _id }) => _id === category);
    properties.push(...selectedCat.properties);

    if (selectedCat.parent !== "") {
      const parent = categories.find(({ _id }) => _id === selectedCat?.parent);
      properties.push(...parent.properties);
    }
  }

  return (
    <div className="create-product a-page">
      <div className="cp-cont cont">
        <h1>Create Product</h1>

        <form onSubmit={uploadProduct} className="prod-fields">
          <div className="field">
            <p>Product Name</p>
            <input
              type="text"
              name="title"
              placeholder="Lenovo ideapad..."
              required
            />
          </div>

          <div className="field">
            <p>Category</p>
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value=""> -- No category -- </option>
              {categories.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {properties.map((property, i) => (
            <div className="field" key={i}>
              <p>{property.name}</p>
              <select
                onChange={(e) =>
                  assignProdProperties(property.name, e.target.value)
                }
              >
                {property.values.split(",").map((value, _i) => (
                  <option value={value} key={_i}>
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
                {images.length > 0 &&
                  images.map((image, i) => (
                    <div className="image" key={i}>
                      <img src={image} alt="" />
                    </div>
                  ))}
              </ReactSortable>

              <label
                className="add-image"
                style={{
                  display: images?.length === 5 ? "none" : "flex",
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
              placeholder="about the product..."
              //   required
            ></textarea>
          </div>

          <div className="field">
            <p>Price (in N$)</p>
            <input type="number" name="price" placeholder="500" required />
          </div>

          <button type="submit" className="submitBtn">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
