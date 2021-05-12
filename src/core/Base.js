import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Base = ({ children }) => {
  return (
    <div className="ref-container">
      <NavBar />
      <div className="ref">{children}</div>
      <Footer />
    </div>
  );
};

export default Base;
