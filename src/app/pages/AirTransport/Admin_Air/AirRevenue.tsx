import React, { useState } from "react";
import Pagination from "../../Pagination"; // Assuming Pagination component exists
// import AddRevenue from "./AddRevenue"; // Assuming AddRevenue modal exists
import aircraftStatistic from "../../../../../public/media/stock/statistic.png"; // Example aircraft image

// Example static data for aircraft revenue
const mockAircraftRevenue = [
  { id: 1, route: "Route X", ticketType: "One-time", date: "2024-12-25", status: "Paid", amount: "150000" },
  { id: 2, route: "Route Y", ticketType: "Monthly", date: "2024-12-24", status: "Pending", amount: "75000" },
  { id: 3, route: "Route Z", ticketType: "One-time", date: "2024-12-23", status: "Paid", amount: "120000" },
];

export const AircraftRevenuePage: React.FC = () => {
  const [revenue, setRevenue] = useState(mockAircraftRevenue);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showAddRevenueModal, setShowAddRevenueModal] = useState(false);

  const filteredRevenue = revenue.filter(
    (item) =>
      item.route.toLowerCase().includes(search.toLowerCase()) ||
      item.ticketType.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEntriesPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value);

  const toggleAddRevenueModal = () => setShowAddRevenueModal(!showAddRevenueModal);

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Aircraft Revenue</span>
          <span className="text-muted mt-1 fw-semibold fs-7">Total Revenue Entries: 34578</span>
        </h3>

        <div className="card-toolbar d-flex flex-end">
          {/* Filter */}
          <div className="d-flex align-items-center">
            <span className="fs-7 fw-bolder text-gray-700 pe-4 text-nowrap d-none d-xxl-block">Filter By:</span>
            <select
              className="form-select form-select-sm form-select-solid w-100px w-xxl-125px"
              value={status}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Monthly">Monthly</option>
              <option value="One-time">Quaterly</option>
              <option value="One-time">Yearly</option>
            </select>
          </div>
          {/* Add New Revenue */}
          <button type="button" className="btn btn-light-primary border-0 rounded mx-2" onClick={toggleAddRevenueModal}>
            <i className="fs-2 bi bi-plus" />
            Add New Aircraft Revenue
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        {/* Images */}
        <div className="d-flex justify-content-between mb-4">
          <div className="images-container" style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '-50px' }}>
            <img src={aircraftStatistic} alt="Aircraft Statistic" className="revenue-image" />
            <img src={aircraftStatistic} alt="Aircraft Revenue" className="revenue-image" />
          </div>
        </div>

        {/* Table displaying the aircraft revenue data */}
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Route</th>
                <th>Ticket Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredRevenue
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((revenueItem) => (
                  <tr key={revenueItem.id}>
                    <td>{revenueItem.route}</td>
                    <td>{revenueItem.ticketType}</td>
                    <td>{revenueItem.date}</td>
                    <td>{revenueItem.status}</td>
                    <td>{revenueItem.amount}</td>
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
          totalPages={Math.ceil(filteredRevenue.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>

      {/* Add Aircraft Revenue Modal */}
      {/* {showAddRevenueModal && (
        <AddRevenue
          onClose={toggleAddRevenueModal}
          onAdd={(newRevenue) => {
            setRevenue([...revenue, newRevenue]);
          }}
        />
      )} */}
    </div>
  );
};
