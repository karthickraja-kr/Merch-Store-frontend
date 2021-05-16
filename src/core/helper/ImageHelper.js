import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageURL = product
    ? `${API}/product/photo/${product._id}`
    : "https://www.universityliving.com/js/src/client/assets/details/images/placeholder.svg";
  return (
    <div>
      <img
        src={imageURL}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="rounded"
      />
    </div>
  );
};

export default ImageHelper;
