import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Admin from "../user/Admin";
import { createProduct, getCategory } from "./helper/adminapicall";
import LoadingScreen from "../core/LoadingScreen";

const AddProduct = () => {
  const [value, setValue] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: false,
    success: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    photo,
    loading,
    error,
    success,
    formData,
  } = value;
  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategory().then((data) => {
      if (data.error) {
        setValue({ ...value, error: true });
      } else {
        setValue({ ...value, categories: data, formData: new FormData() });
      }
    });
  };

  const errorMessage = () => {
    return <div className="alert alert-danger">Something went wrong.</div>;
  };

  const successMessage = () => {
    return (
      <div className="alert alert-success">Product added successfully.</div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValue({ ...value, error: false, success: false, loading: false });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValue({ ...value, error: true, loading: false });
        } else {
          setValue({
            ...value,
            name: "",
            description: "",
            price: "",
            stock: "",
            photo: "",
            category: "",
            formData: new FormData(),
            loading: false,
            success: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (name) => (event) => {
    const newValue =
      name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, newValue);
    setValue({ ...value, [name]: newValue });
  };

  // name, description, price, category, stock

  const Form = () => {
    return (
      <form>
        <div class="mb-3">
          <label class="form-label text-secondary">Product Name</label>
          <input
            type="text"
            class="form-control"
            required
            autoFocus
            placeholder="Shirts"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div class="mb-3">
          <label class="form-label text-secondary">Product Description</label>
          <textarea
            onChange={handleChange("description")}
            className="form-control"
            placeholder="Comfortable Shirt"
            value={description}
          />
        </div>
        <div class="mb-3">
          <label class="form-label text-secondary">Price</label>
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            placeholder="500"
            value={price}
          />
        </div>
        <div class="mb-3">
          <label class="form-label text-secondary">Category</label>
          <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
            value={category}
          >
            <option>Select</option>
            {categories &&
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              ))}
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label text-secondary">Stock</label>
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="20"
            value={stock}
          />
        </div>
        <div className="mb-3">
          <label class="form-label text-secondary">Photo</label>
          <br />
          <label className="btn btn-block bg-light">
            <input
              onChange={handleChange("photo")}
              type="file"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          onClick={(e) => onSubmit(e)}
        >
          Submit
        </button>
      </form>
    );
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Admin>
      <div className="row">
        <div className="container col-8 ">
          <h5>Add Product</h5>
          {loading && <LoadingScreen />}
          {error && errorMessage()}
          {success && successMessage()}
          {Form()}
        </div>
        <div className="col-4"></div>
      </div>
    </Admin>
  );
};

export default AddProduct;
