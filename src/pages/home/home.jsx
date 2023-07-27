import React, { useContext } from "react";
import "./home.css";
import { Featured, ItemCardSkel, MiniNav, NewItemCard } from "../../components";
import { Link } from "react-router-dom";
import { appContext } from "../../App";

function Home() {
  const { products, dataLoading, settings } = useContext(appContext);

  const getFeaturedItem = (pos) => {
    let item = {};

    if (pos === "1") {
      item = products.find(({ _id }) => _id === settings.featured1);
    } else if (pos === "2") {
      item = products.find(({ _id }) => _id === settings.featured2);
    }

    return item;
  };

  return (
    <div className="home">
      <MiniNav />
      <Featured item={getFeaturedItem("1")} />

      <section className="new-items">
        <div className="max-width">
          <div className="ni-header">
            <h1 className="title">New Products</h1>

            <Link>See More</Link>
          </div>

          <div className="new-i">
            {dataLoading && <ItemCardSkel count={4} />}
            {products.slice(0, 4).map((item, i) => (
              <NewItemCard item={item} key={i} />
            ))}
          </div>
        </div>
      </section>

      <Featured item={getFeaturedItem("2")} />

      <section className="all-items">
        <div className="max-width">
          <div className="more-items">
            {dataLoading && <ItemCardSkel count={4} />}
            {products.slice(4, 8).map((item, i) => (
              <NewItemCard item={item} key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
