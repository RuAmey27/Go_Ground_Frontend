import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_APP_API_URL
// Step 1: Define the Route interface
interface Route {
  id: number;
  source: string;
  destination: string;
  distance: number;
  date: string;
  vehicleType: string;
}

// Form data for submitting initial stage details
interface BusBookingFormData {
  source: string;
  destination: string;
  vehicleType: string;
  date: string;
}

const BusBooking: React.FC = () => {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [availableRoutes, setAvailableRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [vehicleStatus, setVehicleStatus] = useState<string | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/user/search_routes`,
        { source, destination, vehicleType, date },
        {
          withCredentials: true,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );

      if (Array.isArray(response.data)) {
        setAvailableRoutes(response.data);
      } else {
        setAvailableRoutes([]);
      }
    } catch (error) {
      alert("Failed to fetch available routes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkVehicleAvailability = async (routeId: number) => {
    try {
      const response = await axios.get(
        `${API_URL}/vehicle/searchVehicle?type=${vehicleType}&routeId=${routeId}`
      );

      if (response.status === 200 && response.data === "Vehicle is valid and available") {
        setVehicleStatus("available");
      } else {
        setVehicleStatus("unavailable");
      }
    } catch (error: any) {
      setVehicleStatus("unavailable");
    }
  };

  const handleBook = async (routeId: number) => {
    setSelectedRouteId(routeId);
    await checkVehicleAvailability(routeId);
  };

  const handleProceed = () => {
    const formData: BusBookingFormData = { source, destination, vehicleType, date };
    if (selectedRouteId) {
      navigate(`/passenger-details/${selectedRouteId}`, { state: { routeId: selectedRouteId, formData } });
    }
    setVehicleStatus(null); // Close modal
  };

  const handleCloseModal = () => {
    setVehicleStatus(null);
    setSelectedRouteId(null);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Bus Booking Form</h3>
        </div>
        <div className="card-body">
          <div className="row align-items-end">
            <div className="col-md-3">
              <label htmlFor="source" className="form-label">
                Source
              </label>
              <input
                type="text"
                id="source"
                className="form-control"
                placeholder="Enter Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="destination" className="form-label">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                className="form-control"
                placeholder="Enter Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="vehicleType" className="form-label">
                Vehicle Type
              </label>
              <select
                id="vehicleType"
                className="form-select"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="bus">Bus</option>
                <option value="cab">Cab</option>
              </select>
            </div>

            <div className="col-md-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3 d-flex justify-content-end">
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h2>Available Routes</h2>
          {loading && <p>Loading routes...</p>}
          {availableRoutes.length === 0 && !loading && <p>No routes available.</p>}
          {availableRoutes.length > 0 && (
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Date</th>
                  <th>Vehicle Type</th>
                  <th>Distance (km)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availableRoutes.map((route) => (
                  <tr key={route.id}>
                    <td>{route.id}</td>
                    <td>{route.source}</td>
                    <td>{route.destination}</td>
                    <td>{route.date}</td>
                    <td>{route.vehicleType}</td>
                    <td>{route.distance}</td>
                    <td>
                      <button
                        onClick={() => handleBook(route.id)}
                        className="btn btn-success btn-sm"
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal for vehicle availability */}
      {vehicleStatus && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Vehicle Availability</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                {vehicleStatus === "available" ? (
                  <p>The vehicle is available. Do you want to proceed with booking?</p>
                ) : (
                  <p>Sorry, the vehicle is not available right now. Please try another route.</p>
                )}
              </div>
              <div className="modal-footer">
                {vehicleStatus === "available" && (
                  <button className="btn btn-primary" onClick={handleProceed}>
                    Proceed
                  </button>
                )}
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusBooking;
