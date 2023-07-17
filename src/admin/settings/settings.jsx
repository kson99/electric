import React, { useContext } from "react";
import "./settings.css";
import { data } from "../../assets";
import { appContext } from "../../App";

function Settings() {
  const { products } = useContext(appContext);

  return (
    <div className="settings a-page">
      <div className="set-cont cont">
        <h1>Settings</h1>

        <div className="settings-list">
          <div className="featured">
            <p>Featured product</p>
            <select name="featured">
              <option value="default">--Select product--</option>
              {products.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <button>Save Settings</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
