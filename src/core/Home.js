import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProduct } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadingProduct = () => {
    getProduct()
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadingProduct();
  }, []);

  return (
    <Base>
      <div className="p-3 m-4 bg-light rounded-3">
        <div className="container-fluid">
          <img src={logo} style={{ height: 100 }} alt="Merch logo" />
          <p className="col-md-8 mx-4">Buy all Products with ease</p>
        </div>
      </div>
      <div className="container">
        <h4 className="text-center text-secondary m-4">Products</h4>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div className="col-4" key={index}>
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
