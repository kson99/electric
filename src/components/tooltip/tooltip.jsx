import React from "react";
import "./tooltip.css";
import IonIcon from "@reacticons/ionicons";

function IconWithTooltip({ name, text }) {
  return (
    <div className="tooltip">
      <div className="tooltip-text">
        <p>{text}</p>
        <div className="arrow">
          <div className="pointer"></div>
        </div>
      </div>

      <IonIcon name={name} className="icon" />
    </div>
  );
}

export default IconWithTooltip;
