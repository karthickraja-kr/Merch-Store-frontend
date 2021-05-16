import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { getCartItem, removeCartItem } from "../core/helper/coreHelper";
import { getProduct } from "../core/helper/coreapicalls";
import ImageHelper from "../core/helper/ImageHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState([]);

  const loadingProduct = () => {
    getProduct()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadingProduct();
    getProductId();
  }, []);

  const getProductId = () => {
    setId(getCartItem());
  };

  const removeId = (product) => {
    removeCartItem(product._id, product.price, () => setId(getCartItem()));
  };

  return (
    <Base>
      <div className="container p-4">
        <h4 className="text-center">Cart</h4>
        <div className="row p-4">
          <div className="col-8">
            <h5>
              Total items : {id.length - 1 > 0 ? id.length - 1 : "No items"}
            </h5>
            {products.map((product, index) => {
              if (id.indexOf(product._id) !== -1) {
                return (
                  <div className="row p-4 m-2">
                    <div className="col-3">
                      <ImageHelper product={product} />
                    </div>
                    <div className="col-9 cart-item">
                      <h5 className="col-8">{product.name}</h5>
                      <p className="text-secondary col">₹ {product.price}</p>
                      <p
                        className="btn btn-danger col"
                        onClick={() => removeId(product)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="col-4 bg-light rounded p-4">
            <h5 className="py-3">Summary</h5>
            <p className="text-secondary">
              Totat Price :{" "}
              <span className="text-dark">{id[0] ? id[0] : 0}</span>{" "}
            </p>
            {id.length - 1 > 0 ? (
              <p
                className="btn btn-primary"
                onClick={() =>
                  alert(
                    "This site is developed for gaining skills not for sale any products. Hopefully You like this website : )"
                  )
                }
              >
                Checkout
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
