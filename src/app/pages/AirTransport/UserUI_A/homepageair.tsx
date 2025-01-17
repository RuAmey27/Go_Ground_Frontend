// import React from "react";
import { useNavigate } from "react-router-dom";
const AirHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Air Travel Booking Form</h3>
        </div>
        <div className="card-body">
          <div className="row align-items-end">
            {/* Source Airport */}
            <div className="col-md-2">
              <label htmlFor="sourceAirport" className="form-label">
                Source Airport
              </label>
              <input
                type="text"
                id="sourceAirport"
                className="form-control"
                placeholder="Enter Source Airport"
              />
            </div>

            {/* Destination Airport */}
            <div className="col-md-2">
              <label htmlFor="destinationAirport" className="form-label">
                Destination Airport
              </label>
              <input
                type="text"
                id="destinationAirport"
                className="form-control"
                placeholder="Enter Destination Airport"
              />
            </div>

            {/* Departure Date */}
            <div className="col-md-2">
              <label htmlFor="departureDate" className="form-label">
                Departure Date
              </label>
              <input type="date" id="departureDate" className="form-control" />
            </div>

            {/* Return Date */}
            <div className="col-md-2">
              <label htmlFor="returnDate" className="form-label">
                Return Date (Optional)
              </label>
              <input type="date" id="returnDate" className="form-control" />
            </div>

            {/* Number of Passengers */}
            <div className="col-md-2">
              <label htmlFor="numPassengers" className="form-label">
                Passengers
              </label>
              <input
                type="number"
                id="numPassengers"
                className="form-control"
                placeholder="Number of Passengers"
              />
            </div>

            {/* Travel Class */}
            <div className="col-md-2">
              <label htmlFor="travelClass" className="form-label">
                Travel Class
              </label>
              <select id="travelClass" className="form-select">
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="firstClass">First Class</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="col-md-12 mt-12 d-flex justify-content-end">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/Air/Search")}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Discounts Section */}
        <div className="card mt-4">
          <h1>Exclusive Flight Deals</h1>
          <div className="row">
            {/* First Card */}
            <div className="col-md-4 mb-4">
              <div
                className="bg-light-info px-6 py-8 rounded-2 me-7"
                style={{ width: "200px" }}
              >
                <i className="ki-duotone ki-abstract-26 fs-3x text-info d-block my-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <a href="#" className="text-info fw-semibold fs-6 mt-2">
                  15% Off International Flights
                </a>
              </div>
            </div>

            {/* Second Card */}
            <div className="col-md-4 mb-4">
              <div
                className="bg-light-info px-6 py-8 rounded-2 me-7"
                style={{ width: "200px" }}
              >
                <i className="ki-duotone ki-abstract-26 fs-3x text-info d-block my-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <a href="#" className="text-info fw-semibold fs-6 mt-2">
                  20% Off Domestic Flights
                </a>
              </div>
            </div>

            {/* Third Card */}
            <div className="col-md-4 mb-4">
              <div
                className="bg-light-info px-6 py-8 rounded-2 me-7"
                style={{ width: "200px" }}
              >
                <i className="ki-duotone ki-abstract-26 fs-3x text-info d-block my-2">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <a href="#" className="text-info fw-semibold fs-6 mt-2">
                  25% Off on Group Bookings
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirHomePage;
