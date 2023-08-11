import React from "react";
import "./not-found.css";

function NotFound() {
  return (
    <div className="not-found">
      <div className="max-width">
        <div className="nf-cont">
          <img src="../../../public/404.png" alt="" />
          <h1>Page Not Found!</h1>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
