import React from "react";

const LoadingScreen = () => {
  return (
    <div className="loading-page">
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
