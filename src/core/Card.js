import React from "react";
import { addCartToItem } from "./helper/coreHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product }) => {
  const addItem = (product) => {
    addCartToItem(product, () => alert("Item added to the cart"));
  };
  return (
    <div className="card my-2">
      <ImageHelper product={product} />
      <div className="card-body">
        <h5>{product.name}</h5>
        <p className=" text-secondary">{product.description}</p>
        <h5>
          <span className="badge bg-warning">{`₹ ${product.price}`}</span>
        </h5>
        <p onClick={() => addItem(product)} className="btn btn-primary">
          Add to Cart
        </p>
      </div>
    </div>
  );
};

export default Card;
