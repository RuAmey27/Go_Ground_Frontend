import React, { useState } from "react";
import Pagination from "../../Pagination";

// Example static data for ship bookings
const mockShipBookings = [
  { id: 1, username: "John Doe", amount: 500, source: "San Francisco", destination: "Sydney", date: "2024-12-20", shipType: "Cargo" },
  { id: 2, username: "Jane Smith", amount: 350, source: "Houston", destination: "Singapore", date: "2024-12-21", shipType: "Passenger" },
  { id: 3, username: "Alice Johnson", amount: 450, source: "Miami", destination: "Vancouver", date: "2024-12-22", shipType: "Cargo" },
  { id: 4, username: "Robert Brown", amount: 600, source: "Los Angeles", destination: "Hong Kong", date: "2024-12-23", shipType: "Passenger" },
];

export const ShipBookingPage: React.FC = () => {
  const [bookings, setBookings] = useState(mockShipBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);

  const filteredBookings = bookings.filter((booking) =>
    booking.username.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleAddBooking = (newBooking: { username: string; amount: number; source: string; destination: string; date: string; shipType: string }) => {
    const newBookingWithId = { ...newBooking, id: bookings.length + 1 };
    setBookings([...bookings, newBookingWithId]);
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Ship Bookings</span>
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
          <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
            onClick={() => setShowAddBookingModal(true)}
          >
            <i className="fs-2 bi bi-plus" />
            Add New Booking
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Username</th>
                <th>Amount</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Date</th>
                <th>ShipType</th> {/* Added ShipType column */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.username}</td>
                    <td>{booking.amount}</td>
                    <td>{booking.source}</td>
                    <td>{booking.destination}</td>
                    <td>{booking.date}</td>
                    <td>{booking.shipType}</td> {/* Added ShipType value */}
                    <td className="text-center">
                      <div className="d-flex flex-row align-items-center">
                        <button
                          className="btn btn-icon btn-bg-light btn-sm me-1"
                          // View button functionality
                        >
                          <i className="ki-duotone ki-eye fs-3 text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                          </i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          // Edit button functionality
                        >
                          <i className="ki-duotone ki-pencil fs-3 text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          // Delete button functionality
                        >
                          <i className="ki-duotone ki-trash fs-3 text-danger">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                          </i>
                        </button>
                      </div>
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

      {/* Add Booking Modal */}
      {/* {showAddBookingModal && (
        <AddShipBooking
          onClose={() => setShowAddBookingModal(false)}
          onAdd={handleAddBooking}
        />
      )} */}
    </div>
  );
};
