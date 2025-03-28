import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API_URL;
const accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

interface Route {
  id: number;
  source: string;
  destination: string;
  distance: number;
  date: string;
  vehicleType: string;
}


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
    const [suggestions, setSuggestions] = useState<{ source: any[]; destination: any[] }>({
      source: [],
      destination: [],
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [availableRoutes, setAvailableRoutes] = useState<Route[]>([]);
    const [vehicleStatus, setVehicleStatus] = useState<string | null>(null);
    const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target as { name: "source" | "destination"; value: string };
      if (name === "source") setSource(value);
      if (name === "destination") setDestination(value);

      if (value.length > 2) {
        const encodedValue = encodeURIComponent(value);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedValue}.json?access_token=${accessToken}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          const fetchedSuggestions = data.features || [];
          setSuggestions((prev) => ({ ...prev, [name]: fetchedSuggestions }));
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions((prev) => ({ ...prev, [name]: [] }));
      }
    };

    const handleSuggestionClick = (suggestion: any, field: "source" | "destination") => {
      const { place_name } = suggestion;
      if (field === "source") setSource(place_name);
      if (field === "destination") setDestination(place_name);
      setSuggestions((prev) => ({ ...prev, [field]: [] }));
    };

  const handleSearch = async () => {
    if (!source || !destination || !vehicleType || !date) {
      alert("Please fill in all fields");
      return;
    }
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
    <div>
      <style>{`
        .suggestion-list {
          position: absolute;
          background: white;
          border: 1px solid #ddd;
          border-radius: 5px;
          max-height: 150px;
          overflow-y: auto;
          z-index: 1000;
        }
        .suggestion-item {
          padding: 10px;
          cursor: pointer;
        }
        .suggestion-item:hover {
          background: #f0f0f0;
        }
          .container {
          margin: 30px auto;
          max-width: 85%;
          font-family: 'Arial', sans-serif;
        }
        .card {
          border-radius: 12px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          transition: all 0.3s ease-in-out;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .card-header {
          background-color: #007bff;
          color: white;
          padding: 20px;
          font-size: 1.6rem;
          font-weight: bold;
          border-radius: 12px 12px 0 0;
        }
        .card-body {
          padding: 30px;
          background-color: #f9f9f9;
          border-radius: 0 0 12px 12px;
        }
        .form-label {
          font-weight: bold;
          color: #333;
        }
        .form-control,
        .form-select {
          border-radius: 8px;
          border: 1px solid #ddd;
          padding: 12px;
          margin-top: 5px;
          width: 100%;
          transition: border 0.3s ease;
        }
        .form-control:focus,
        .form-select:focus {
          border-color: #4caf50;
          box-shadow: 0 0 5px rgba(76, 175, 80, 0.4);
        }
        .input-group {
          margin-bottom: 20px;
        }
        .input-group-text {
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px;
        }
        .btn {
          border-radius: 8px;
          padding: 12px 20px;
          font-weight: bold;
        }
        .btn-primary {
          background-color: #007bff;
          border-color: #007bff;
          transition: all 0.3s ease-in-out;
        }
        .btn-primary:hover {
          background-color: #0056b3;
          border-color: #0056b3;
        }
        .btn-success {
          background-color: #28a745;
          border-color: #28a745;
        }
        .btn-success:hover {
          background-color: #218838;
          border-color: #218838;
        }
        .btn:disabled {
          opacity: 0.7;
        }
        .table {
          margin-top: 20px;
          width: 100%;
          border-collapse: collapse;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #ddd;
        }
        .table th,
        .table td {
          text-align: center;
          padding: 18px;
        }
        .table-striped tbody tr:nth-of-type(odd) {
          background-color: #f9f9f9;
        }
        .table-bordered {
          border: 1px solid #ddd;
        }
        .table-primary th {
          background-color: #007bff;
          color: white;
        }
        .table-striped th {
          background-color: #007bff;
          color: white;
        }
        .table-striped td {
          background-color: #f9f9f9;
        }
        .table-striped td:hover {
          background-color: #f0f0f0;
        }
        .table-bordered td,
        .table-bordered th {
          border: 1px solid #ddd;
        }
      `}</style>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Bus Booking Form</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 position-relative">
                <label htmlFor="source" className="form-label">
                  Source
                </label>
                <input
                  type="text"
                  name="source"
                  id="source"
                  className="form-control"
                  placeholder="Enter Source"
                  value={source}
                  onChange={handleInputChange}
                />
                {suggestions.source.length > 0 && (
                  <div className="suggestion-list">
                    {suggestions.source.map((sug, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(sug, "source")}
                      >
                        {sug.place_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-md-6 position-relative">
                <label htmlFor="destination" className="form-label">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  className="form-control"
                  placeholder="Enter Destination"
                  value={destination}
                  onChange={handleInputChange}
                />
                {suggestions.destination.length > 0 && (
                  <div className="suggestion-list">
                    {suggestions.destination.map((sug, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(sug, "destination")}
                      >
                        {sug.place_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
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
              <div className="col-md-6">
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
            <div className="mt-4">
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
                <thead className="table-primary">
                  <tr>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Distance</th>
                    <th>Date</th>
                    <th>Vehicle Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {availableRoutes.map((route) => (
                    <tr key={route.id}>
                      <td>{route.source}</td>
                      <td>{route.destination}</td>
                      <td>{route.distance} km</td>
                      <td>{date}</td>
                      <td>{vehicleType}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleBook(route.id)}
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
        {vehicleStatus && (
          <div>
            {vehicleStatus === "available" ? (
              <div>
                <h3>Vehicle is available. Proceed to the next step.</h3>
                <button className="btn btn-success" onClick={handleProceed}>
                  Proceed
                </button>
              </div>
            ) : (
              <h3>No vehicle available for the selected route.</h3>
            )}
            <button className="btn btn-danger" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusBooking;
