import React, { useContext } from "react";
import "./home.css";
import {
  Featured,
  ItemCardSkel,
  MiniNav,
  NewItemCard,
  QuickView
} from "../../components";
import { Link } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";
import { appContext } from "../../grobal/context";

function Home() {
  const { products, dataLoading, settings } = useContext(appContext);

  const getFeaturedItem = pos => {
    let item = {};

    if (pos === "1") {
      item = products.find(({ _id }) => _id === settings.featured1);
    } else if (pos === "2") {
      item = products.find(({ _id }) => _id === settings.featured2);
    }

    return item;
  };

  const shuffled = () => {
    const items = products.slice(4, products.length - 1);
    const array = [...items];

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array.slice(0, 4);
  };

  return (
    <div className="home">
      <MiniNav />
      <Featured item={getFeaturedItem("1")} />

      <section className="new-items">
        <div className="max-width">
          <div className="ni-header">
            <h1 className="title">New Products</h1>

            <Link to="/products" state={{ name: "All" }}>
              See More
            </Link>
          </div>

          <div className="new-i">
            {dataLoading && <ItemCardSkel count={4} />}
            {products
              .slice(0, 4)
              .map((item, i) => <NewItemCard item={item} key={i} />)}
          </div>
        </div>
      </section>

      <Featured item={getFeaturedItem("2")} />

      <section className="all-items">
        <div className="max-width">
          <div className="more-items">
            {dataLoading && <ItemCardSkel count={4} />}
            {shuffled().map((item, i) => <NewItemCard item={item} key={i} />)}
          </div>
        </div>
      </section>

      <div className="newsletter">
        <p id="header">
          Sign Up for the <b>NEWSLETTER</b>
        </p>

        <div className="input">
          <input type="email" placeholder="Enter Your Email" />
          <div className="subscribe">
            <IonIcon name="mail" className="icon" />
            <b>Subscribe</b>
          </div>
        </div>

        <div className="social-buttons">
          <div className="facebook">
            <IonIcon name="logo-facebook" className="icon" />
          </div>
          <div className="twitter">
            <IonIcon name="logo-twitter" className="icon" />
          </div>
          <div className="instagram">
            <IonIcon name="logo-instagram" className="icon" />
          </div>
          <div className="email">
            <IonIcon name="at-outline" className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
