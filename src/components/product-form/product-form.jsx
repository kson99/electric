import React, { useState } from "react";
import IonIcon from "@reacticons/ionicons";
import { ReactSortable } from "react-sortablejs";

function ProductForm({ data }) {
  const [images, setImages] = useState([]);
  const [imagesAdded, setImagesAdded] = useState([...data.images]);

  console.log(data);
  const onSave = () => {
    // event.preventDefault();
  };

  const imagesUpdateOrder = (images) => {
    setImagesAdded(images);
  };

  return <div className="product-form"></div>;
}

export default ProductForm;
