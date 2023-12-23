import React from "react";

const Content1 = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center content">
      <h2 className="fw-bold text-info">KIDRPIRE</h2>
      <span className="fs-4 text text-danger">Kids Activity Programs</span>
      <div className="d-flex gap-3 mt-3">
        <div className="icon-content text-primary">
          <i className="fab fa-facebook-f"></i>
        </div>
        <div className="icon-content text-info">
          <i className="fab fa-twitter"></i>
        </div>
        <div className="icon-content text-danger">
          <i className="fab fa-google-plus-g"></i>
        </div>
      </div>
    </div>
  );
};

export default Content1;
