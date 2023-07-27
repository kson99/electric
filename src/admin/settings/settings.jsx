import React, { useContext, useState } from "react";
import "./settings.css";
import { appContext, url } from "../../App";
import axios from "axios";
import Loader from "../products/loader/loader";

function Settings() {
  const { products, settings, refleshCtx } = useContext(appContext);
  const [reflesh, setReflesh] = refleshCtx;

  const [loading, setLoading] = useState(false);

  console.log(settings._id);

  const onSave = async (ev) => {
    ev.preventDefault();

    setLoading(true);

    let data = {
      featured1: ev.target.featured1.value,
      featured2: ev.target.featured2.value,
      shipping: ev.target.shipping.value,
      id: settings._id,
    };

    await axios.put(url + "/settings/update", data).then((res) => {
      console.log("successfull");
      setReflesh(reflesh + 1);
    });

    setLoading(false);
  };

  return (
    <div className="settings a-page">
      <div className="set-cont cont">
        <h1>Settings</h1>

        <form onSubmit={onSave} className="settings-list">
          <Loader trigger={loading} />
          <div className="featured">
            <p>Featured product 1</p>
            <select name="featured1" defaultValue={settings.featured1}>
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
            <select name="featured2" defaultValue={settings.featured2}>
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
              defaultValue={settings.shipping}
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
