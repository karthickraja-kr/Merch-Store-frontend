import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import LoadingScreen from "../core/LoadingScreen";
import Admin from "../user/Admin";
import { getProduct, deleteProduct } from "./helper/adminapicall";
import UpdateProduct from "./UpdateProduct";

const ManageProducts = () => {
  const { user, token } = isAuthenticated();
  const [product, setProduct] = useState([]);
  const [state, setState] = useState({
    error: false,
    success: false,
    loading: false,
    update: false,
    productid: "",
  });

  const { error, success, loading, update, productid } = state;

  const preload = () => {
    getProduct().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteRequest = (productId) => {
    setState({ ...state, error: false, success: false, loading: true });
    deleteProduct(productId, user._id, token)
      .then((data) => {
        if (data.error) {
          setState({ ...state, error: true, success: false, loading: false });
        } else {
          setState({ ...state, error: false, success: true, loading: false });
          preload();
        }
      })
      .catch((err) => console.log(err));
  };

  const errorMessage = () => {
    return <div className="alert alert-danger">Something went wrong.</div>;
  };

  const successMessage = () => {
    return (
      <div className="alert alert-success">Product Deleted successfully.</div>
    );
  };

  return (
    <Admin>
      {!update && (
        <div className="row">
          <div className="container col-9 ">
            <h5>Manage Product</h5>
            <p className="text-secondary">
              Products Available :{" "}
              <span className="text-dark">{product.length} items</span>
            </p>
            {loading && <LoadingScreen />}
            {error && errorMessage()}
            {success && successMessage()}
            <ul class="list-group">
              {product.map((data, index) => (
                <li
                  key={index}
                  class="list-group-item d-flex justify-content-between align-items-center py-2"
                >
                  {data.name}
                  <div>
                    <span
                      onClick={() =>
                        setState({
                          ...state,
                          update: true,
                          productid: data._id,
                        })
                      }
                      class="btn btn-outline-primary"
                    >
                      Update
                    </span>
                    <span
                      onClick={() => deleteRequest(data._id)}
                      class="btn btn-danger mx-4"
                    >
                      Delete
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-3"></div>
        </div>
      )}
      {update && <UpdateProduct productId={productid} />}
    </Admin>
  );
};

export default ManageProducts;
