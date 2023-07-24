import React, { useContext, useEffect, useState } from "react";
import "./categories.css";
import IonIcon from "@reacticons/ionicons";
import axios from "axios";
import { appContext, url } from "../../App";

function Categories() {
  const { categories, refleshCtx } = useContext(appContext);
  const [reflesh, setReflesh] = refleshCtx;

  const [properties, setProperties] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [catNameEditData, setCatNameEditData] = useState("");
  const [catParentEditData, setCatParentEditData] = useState("");
  const [catDeleteData, setCatDeleteData] = useState();
  const [catEditData, setCatEditData] = useState();

  const form = document.getElementById("cat-create");

  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  const removeProperty = (index) => {
    setProperties((prev) => {
      return [...prev].filter((p, pi) => {
        return pi !== index;
      });
    });
  };

  const handlePropertyNameChange = (name, index) => {
    setProperties((prev) => {
      let _properties = [...prev];
      _properties[index].name = name;

      return _properties;
    });
  };

  const handlePropertyValuesChange = (values, index) => {
    setProperties((prev) => {
      let _properties = [...prev];
      _properties[index].values = values;

      return _properties;
    });
  };

  const saveCategory = async (ev) => {
    ev.preventDefault();

    let data = {
      name: ev.target.category.value,
      parent: ev.target.parent_category.value,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values,
      })),
    };

    if (isEdit) {
      await axios.put(url + "/categories/update", {
        ...data,
        id: catEditData._id,
      });
    } else {
      await axios.post(url + "/categories/upload", data);
    }

    setCatNameEditData("");
    setCatParentEditData("");
    setProperties([]);
    setIsEdit(false);
    form.reset();
    setReflesh(reflesh + 1);
  };

  const deleteCategory = async () => {
    await axios
      .delete(url + "/categories/delete", {
        data: { id: catDeleteData._id },
      })
      .then(() => {
        setReflesh(reflesh + 1);
        setIsDelete(false);
      });
  };

  const getParentName = (id) => {
    let parent = "";
    categories.forEach((category) => {
      if (category._id === id) {
        parent = category.name;
      }
    });

    return parent;
  };

  const populateProperties = () => {
    let _properties =
      catEditData?.properties === undefined ? [] : [...catEditData?.properties];

    if (isEdit) {
      setProperties([..._properties]);
    } else {
      setProperties([]);
    }
  };

  useEffect(() => {
    populateProperties();
  }, [isEdit]);

  return (
    <div className="categories a-page">
      <div className="cat-cont cont">
        <h1>Categories</h1>

        <div className="cat-fields">
          <form onSubmit={saveCategory} id="cat-create" className="f-fields">
            <div className="f-field">
              <p>
                {isEdit
                  ? `Edit category "${catNameEditData}"`
                  : "Create new category"}
              </p>
              <div className="f-options">
                <input
                  type="text"
                  name="category"
                  placeholder="Category name"
                  required
                  defaultValue={catNameEditData}
                />

                <select
                  name="parent_category"
                  value={catParentEditData}
                  onChange={(e) => setCatParentEditData(e.target.value)}
                >
                  <option value="">No parent category</option>
                  {categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="f-field">
              <p>Properties</p>
              <button onClick={addProperty} type="button">
                Add new Property
              </button>
            </div>

            {properties?.map((property, index) => (
              <div className="field properties" key={index}>
                <input
                  type="text"
                  placeholder="property name (example: color)"
                  value={property.name}
                  required
                  onChange={(e) =>
                    handlePropertyNameChange(e.target.value, index)
                  }
                />

                <input
                  type="text"
                  placeholder="values, (comma seperated)"
                  value={property.values}
                  required
                  onChange={(e) =>
                    handlePropertyValuesChange(e.target.value, index)
                  }
                />

                <div className="close-icon">
                  <IonIcon
                    onClick={() => removeProperty(index)}
                    name="close-circle"
                    className="icon"
                  />
                </div>
              </div>
            ))}

            <div className="cat-buttons">
              <button
                id="cancel"
                type="button"
                style={{
                  display: isEdit ? "block" : "none",
                }}
                onClick={() => {
                  setCatNameEditData("");
                  setCatParentEditData("");
                  setProperties([]);
                  setIsEdit(false);
                }}
              >
                Cancel
              </button>

              <button type="submit" className="submitBtn">
                Save
              </button>
            </div>
          </form>

          <div
            className="cat-list"
            style={{
              display: isEdit ? "none" : "block",
            }}
          >
            {isDelete ? (
              <table>
                <thead>
                  <tr>
                    <td id="deleting-header">
                      Are you sure you want to delete category:
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td id="deleting-row">
                      <p>{catDeleteData.name}</p>
                      <div className="crud-buttons">
                        <button
                          onClick={() => {
                            setIsDelete(false);
                            setCatDeleteData({});
                          }}
                        >
                          <p>Cancel</p>
                        </button>
                        <button onClick={deleteCategory}>
                          <p>Yes, Delete</p>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table>
                <thead>
                  <tr>
                    <td>Category Name</td>
                    <td>Parent Category</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>{getParentName(category.parent)}</td>
                      <td>
                        <div className="crud-buttons">
                          <button
                            onClick={() => {
                              setIsEdit(true);

                              setCatNameEditData(category.name);
                              setCatParentEditData(category.parent);
                              setCatEditData(category);
                            }}
                          >
                            <IonIcon name="create-outline" className="icon" />
                            <p>Edit</p>
                          </button>
                          <button
                            onClick={() => {
                              setIsDelete(true);
                              setCatDeleteData(category);
                            }}
                          >
                            <IonIcon name="trash-outline" className="icon" />
                            <p>Delete</p>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
