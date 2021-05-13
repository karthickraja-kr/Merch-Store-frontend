import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Admin from "../user/Admin";
import { createCategory } from "./helper/adminapicall";
import LoadingScreen from "../core/LoadingScreen";

const AddCategory = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  const errorMessage = () => {
    return <div className="alert alert-danger">Something went wrong.</div>;
  };

  const successMessage = () => {
    return (
      <div className="alert alert-success">Category added successfully.</div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);
    // Calling Backend
    createCategory(user._id, token, { name: value }).then((data) => {
      if (data.error) {
        setError(true);
        setSuccess(false);
      } else {
        setError(false);
        setSuccess(true);
      }
      setLoading(false);
      setValue("");
    });
  };

  const form = () => {
    return (
      <form>
        <div class="mb-3">
          <label class="form-label">Enter Category Name</label>
          <input
            type="text"
            class="form-control"
            required
            autoFocus
            placeholder="Shirts"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div class="form-text">
            Please use Pascal Case to name categories and meaningful name . For
            example : Shirts, Hoodie ...
          </div>
        </div>
        <button type="submit" class="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </form>
    );
  };

  return (
    <Admin>
      <div className="row">
        <div className="container col-8 ">
          <h5>Add Categories</h5>
          {loading && <LoadingScreen />}
          {error && errorMessage()}
          {success && successMessage()}
          {form()}
        </div>
        <div className="col-4"></div>
      </div>
    </Admin>
  );
};

export default AddCategory;
