import React from "react";
import './footer.css';
import { Link } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";

function Footer() {
  return <div className="footer">
    <div className="max-width">
      <div className="f-tabs">
        <div className="electric">
          <div className="logo">
            <h1>Electric</h1>
            <IonIcon name="flash" className="icon" />
          </div>
        </div>

        <ul className="categories">
          <h3 className="header">Categories</h3>
          <li><Link>Laptops</Link></li>
          <li><Link>Phones</Link></li>
          <li><Link>Cameras</Link></li>
          <li><Link>TVs</Link></li>
          <li><Link>Watches</Link></li>
          <li><Link>Accessories</Link></li>
        </ul>

        <ul className="my-account">
          <h3 className="header">Account</h3>
          <li><Link>Sign In / Register</Link></li>
          <li><Link>View Cart</Link></li>
          <li><Link>Wishlist</Link></li>
          <li><Link>Help</Link></li>
        </ul>
      </div>
    </div>
  </div>;
}

export default Footer;
