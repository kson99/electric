import React from "react";
import "./errorToast.css";
import IonIcon from "@reacticons/ionicons";

function ErrorToast({ trigger, error, setTrigger }) {
  return (
    trigger && (
      <div className="error-toast">
        <div className="popup">
          <div>
            <IonIcon name="bug" className="bug" />
            <p>{error}</p>
            <IonIcon
              name="close-circle"
              className="icon"
              onClick={() => setTrigger(false)}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default ErrorToast;
