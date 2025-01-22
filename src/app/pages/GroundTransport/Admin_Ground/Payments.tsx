import React, { useState, useEffect } from "react";
import Pagination from "../../Pagination";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL
interface Payment {
  id: number;
  paymentMethod: string;
  paymentStatus: string;
  amount: number;
  bookingId: number;
  timestamp: string;
  transactionId: string | null;
}

export const PaymentPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch payments from API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${API_URL}/payment/all`);

        // Log the entire response for debugging
        console.log("API Response:", response.data);

        const mappedPayments = response.data.map((payment: any) => {
          // Log payment object for debugging
          console.log("Processing payment:", payment);

          return {
            id: payment.id,
            paymentMethod: payment.paymentMethod || "Unknown",
            paymentStatus: payment.paymentStatus || "Unknown",
            amount: payment.amount || 0,
            bookingId: payment.bookingId || -1,
            timestamp: payment.timestamp || "Unknown",
            transactionId: payment.transactionId || "No Transaction ID",
          };
        });

        setPayments(mappedPayments);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) =>
    payment.paymentMethod.toLowerCase().includes(search.toLowerCase())
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Payments</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Payments: {filteredPayments.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Payments"
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
                <th>Payment ID</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Booking ID</th>
                <th>Timestamp</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>{payment.paymentStatus}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.bookingId}</td>
                    <td>{payment.timestamp}</td>
                    <td>{payment.transactionId}</td>
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
          totalPages={Math.ceil(filteredPayments.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>
    </div>
  );
};
