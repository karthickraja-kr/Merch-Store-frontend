import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import LoadingScreen from "../core/LoadingScreen";
import Admin from "../user/Admin";
import { getCategory, deleteCategory } from "./helper/adminapicall";

const ManageCategory = () => {
  const [category, setCategory] = useState([]);
  const { user, token } = isAuthenticated();
  const [state, setState] = useState({
    error: false,
    loading: false,
    success: false,
  });

  const { success, error, loading } = state;

  const preload = () => {
    getCategory()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategory(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const removeCategory = (categoryID) => {
    setState({ ...state, error: false, success: false, loading: true });
    deleteCategory(user._id, token, categoryID)
      .then((data) => {
        if (data.error) {
          setState({ ...state, error: true, loading: false });
        } else {
          setState({ ...state, success: true, loading: false });
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
      <div className="alert alert-success">Category added successfully.</div>
    );
  };

  return (
    <Admin>
      <div className="row">
        <div className="container col-9 ">
          {success && successMessage}
          {error && errorMessage}
          {loading && <LoadingScreen />}
          <h5>Manage Category</h5>
          <p className="text-secondary">
            Category Available :{" "}
            <span className="text-dark">{category.length} items</span>
          </p>
          <ul class="list-group">
            {category.map((data, index) => (
              <li
                key={index}
                class="list-group-item d-flex justify-content-between align-items-center py-2"
              >
                {data.name}
                <div>
                  <span
                    onClick={() => {
                      removeCategory(data._id);
                    }}
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
    </Admin>
  );
};

export default ManageCategory;
