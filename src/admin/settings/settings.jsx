import React, { useContext, useState } from "react";
import "./settings.css";
import { appContext, url } from "../../grobal/context";
import axios from "axios";
import Loader from "../products/loader/loader";
import { ErrorToast } from "../../components";

function Settings() {
  const { products, settings, refleshCtx, userId } = useContext(appContext);
  const [reflesh, setReflesh] = refleshCtx;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const onSave = async ev => {
    ev.preventDefault();

    setLoading(true);

    let data = {
      featured1: ev.target.featured1.value,
      featured2: ev.target.featured2.value,
      shipping: ev.target.shipping.value,
      id: settings._id,
      userId
    };

    try {
      await axios.put(url + "/settings/update", data).then(res => {
        setReflesh(reflesh + 1);
      });
    } catch (error) {
      setIsError(true);
      setError("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="settings a-page">
      <div className="set-cont cont">
        <ErrorToast trigger={isError} setTrigger={setIsError} error={error} />
        <h1>Settings</h1>

        <form onSubmit={onSave} className="settings-list">
          <Loader trigger={loading} />
          <div className="featured">
            <p>Featured product 1</p>
            <select name="featured1" defaultValue={settings.featured1}>
              <option value="">--Select product--</option>
              {products.map(item =>
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              )}
            </select>
          </div>

          <div className="featured">
            <p>Featured product 2</p>
            <select name="featured2" defaultValue={settings.featured2}>
              <option value="">--Select product--</option>
              {products.map(item =>
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              )}
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
