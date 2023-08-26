import React from "react";
import "./loader.css";
import { BeatLoader } from "react-spinners";

function Loader({ trigger }) {
  return (
    trigger && (
      <div className="loader">
        <BeatLoader color="#252525" />
      </div>
    )
  );
}

export default Loader;
