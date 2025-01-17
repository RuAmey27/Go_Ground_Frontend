// import React from "react";

const NavBar = () => {
  return (
    <div className="navbar bg-light py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <span className="fw-bold me-3">Sort By:</span>
          <button className="btn btn-outline-primary me-2">Popular</button>
          <br></br>
          <button className="btn btn-outline-primary me-2">User Rating</button>
          <br></br>
          <button className="btn btn-outline-primary me-2">Price</button>
        </div>
        <div className="d-flex">
          <input
            type="text"
            placeholder="Search Ships"
            className="form-control me-2"
            style={{ width: "300px" }}
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
