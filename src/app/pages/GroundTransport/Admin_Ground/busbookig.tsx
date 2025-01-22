import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL
// Interfaces (unchanged)
interface Passenger {
  name: string;
  age: number;
  gender: string;
}

interface Booking {
  bookingId: number;
  source: string;
  destination: string;
  status: string;
  date: string;
  vehicleName: string;
  vehicleType: string;
  driverName: string;
  driverContact: string;
  passengers: Passenger[];
}

let alretShown = false;
const fetchAllBookings = async (setBookings: React.Dispatch<React.SetStateAction<Booking[]>>) => {
  try {
    const response = await axios.get<Booking[]>(`${API_URL}/booking/reports?reportType=all-reports`, {
      withCredentials: true,
    });
    alretShown = false;
    console.log("Fetched bookings:", response.data);
    setBookings(response.data); // Update the state with the fetched data
  } catch (error:any) {
    if (error.response && error.response.status === 401 && !alretShown) {
      alretShown = true; // Set the flag to prevent multiple alerts
      alert("Session expired. Please sign in again.");
    } else {
      console.error("Error fetching bookings:", error);
    }
  }
};

export const BusBookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const filteredBookings = bookings.filter((booking) =>
    booking.vehicleName?.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    // Pass setBookings to fetchAllBookings
    fetchAllBookings(setBookings);
  }, []);

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Bus Bookings</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Bookings: {filteredBookings.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Bookings"
            value={search}
            onChange={handleSearchChange}
          />
          
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Booking ID</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Date</th>
                <th>Vehicle Type</th>
                <th>Vehicle Name</th>
                <th>Driver Name</th>
                <th>Driver Contact</th>
                <th>Passenger Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((booking) => (
                  <tr key={booking.bookingId}>
                    <td>{booking.bookingId}</td>
                    <td>{booking.source}</td>
                    <td>{booking.destination}</td>
                    <td>{booking.status}</td>
                    <td>{booking.date}</td>
                    <td>{booking.vehicleType}</td>
                    <td>{booking.vehicleName}</td>
                    <td>{booking.driverName}</td>
                    <td>{booking.driverContact}</td>
                    <td>
                        {booking.passengers.map((passenger,index)=>(
                          <ul key={index}>
                            <li>Name: {passenger.name}</li>
                            <li>Age: {passenger.age}</li>
                            <li>Gender: {passenger.gender}</li>
                          </ul>
                        ))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="card-footer">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredBookings.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>
    </div>
  );
};
