// NotFound.jsx
import React from "react";

const NotFound = () => {
  return (
    <div className="not-found">
      <img
        src="https://via.placeholder.com/300x400?text=404+Not+Found"
        alt="Not Found"
      />
      <h2>Oops! Movie Not Found</h2>
      <p>The movie ID is invalid or data is missing.</p>
    </div>
  );
};

export default NotFound;
