import React, { useContext } from "react";
import "./settings.css";
import { appContext, url } from "../../App";
import axios from "axios";

function Settings() {
  const { products } = useContext(appContext);

  const onSave = async (ev) => {
    ev.preventDefault();

    let data = {
      featured1: ev.target.featured1.value,
      featured2: ev.target.featured2.value,
      shipping: ev.target.shipping.value,
    };

    await axios.post(url + "/settings/upload", data).then((res) => {
      console.log("successfull");
    });

    console.log(data);
  };

  return (
    <div className="settings a-page">
      <div className="set-cont cont">
        <h1>Settings</h1>

        <form onSubmit={onSave} className="settings-list">
          <div className="featured">
            <p>Featured product 1</p>
            <select name="featured1">
              <option value="">--Select product--</option>
              {products.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="featured">
            <p>Featured product 2</p>
            <select name="featured2">
              <option value="">--Select product--</option>
              {products.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="shipping">
            <p>Shipping Price (in N$)</p>
            <input
              type="number"
              name="shipping"
              placeholder="Shipping price..."
              defaultValue={30}
            />
          </div>

          <button type="submit" className="submitBtn">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
