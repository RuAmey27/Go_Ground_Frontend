// import React from "react";
import { useNavigate } from "react-router-dom";
// import Search from "./Search";
const HomeMain = () => {
  const navigate = useNavigate();

  // const handleSearch = () => {
  //   navigate("/Search");
  // };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Travel Booking Form</h3>
        </div>
        <div className="card-body">
          <div className="row align-items-end">
            {/* Source */}
            <div className="col-md-2">
              <label htmlFor="source" className="form-label">
                Source
              </label>
              <input
                type="text"
                id="source"
                className="form-control"
                placeholder="Enter Source"
              />
            </div>

            {/* Destination */}
            <div className="col-md-2">
              <label htmlFor="destination" className="form-label">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                className="form-control"
                placeholder="Enter Destination"
              />
            </div>

            {/* Date From */}
            <div className="col-md-2">
              <label htmlFor="dateFrom" className="form-label">
                Date From
              </label>
              <input type="date" id="dateFrom" className="form-control" />
            </div>

            {/* Date To */}
            <div className="col-md-2">
              <label htmlFor="dateTo" className="form-label">
                Date To
              </label>
              <input type="date" id="dateTo" className="form-control" />
            </div>

            {/* Number of Travelers */}
            <div className="col-md-2">
              <label htmlFor="numTravelers" className="form-label">
                Travelers
              </label>
              <input
                type="number"
                id="numTravelers"
                className="form-control"
                placeholder="Travelers"
              />
            </div>

            {/* Cruise Type */}
            <div className="col-md-2">
              <label htmlFor="cruiseType" className="form-label">
                Cruise Type
              </label>
              <select id="cruiseType" className="form-select">
                <option value="family">Family</option>
                <option value="premium">Premium</option>
                <option value="luxury">Luxury</option>
                <option value="deluxe">Deluxe</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="col-md-12 mt-12 d-flex justify-content-end">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/water/search")}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* cards */}
        <div className="card">
          <h1> Discounts for you</h1>
          <div className="row">
            {/* First Card */}
            <div className="col-md-4 mb-4">
              <div
                className="bg-light-danger px-6 py-8 rounded-2 me-7"
                style={{ width: "200px" }}
              >
                <i className="ki-duotone ki-abstract-26 fs-3x text-danger d-block my-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <a href="#" className="text-danger fw-semibold fs-6 mt-2">
                  10% off
                </a>
              </div>
            </div>

            {/* Second Card */}
            <div className="col-md-4 mb-4">
              <div
                className="bg-light-danger px-6 py-8 rounded-2 me-7"
                style={{ width: "200px" }}
              >
                <i className="ki-duotone ki-abstract-26 fs-3x text-danger d-block my-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <a href="#" className="text-danger fw-semibold fs-6 mt-2">
                  20% off
                </a>
              </div>
            </div>

            {/* Third Card */}
            <div className="col-md-4 mb-4">
              <div
                className="bg-light-danger px-6 py-8 rounded-2 me-7"
                style={{ width: "200px" }}
              >
                <i className="ki-duotone ki-abstract-26 fs-3x text-danger d-block my-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <a href="#" className="text-danger fw-semibold fs-6 mt-2">
                  30% off
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
