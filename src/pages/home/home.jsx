import React, { useContext } from "react";
import "./home.css";
import { data, promo_image } from "../../assets";
import IonIcon from "@reacticons/ionicons";
import { Featured, ItemCardSkel, MiniNav, NewItemCard } from "../../components";
import { Link } from "react-router-dom";
import { appContext } from "../../App";

function Home() {
  const { products, dataLoading } = useContext(appContext);

  return (
    <div className="home">
      <MiniNav />
      <Featured />

      <section className="new-items">
        <div className="max-width">
          <div className="ni-header">
            <h1 className="title">New Products</h1>

            <Link>See More</Link>
          </div>

          <div className="new-i">
            {dataLoading && <ItemCardSkel count={4} />}
            {products.slice(0, 4).map((item, i) => (
              <NewItemCard item={item} key={i} data={data} />
            ))}
          </div>
        </div>
      </section>

      <Featured />

      <section className="all-items">
        <div className="max-width">
          <div className="tabs">
            <div className="tab">
              <IonIcon name="laptop-outline" className="icon" />
              <p className="laptops">Laptops</p>
            </div>

            <div className="tab">
              <IonIcon name="phone-portrait-outline" className="icon" />
              <p className="phones">Smartphones</p>
            </div>

            <div className="tab">
              <IonIcon name="camera-outline" className="icon" />
              <p className="cameras">Cameras</p>
            </div>

            <div className="tab">
              <IonIcon name="headset-outline" className="icon" />
              <p className="accessories">Accessories</p>
            </div>
          </div>

          <div className="more-items">
            {dataLoading && <ItemCardSkel count={8} />}
            {products.slice(4, 12).map((item, i) => (
              <NewItemCard item={item} key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
