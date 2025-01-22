import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCreditCard, FaWallet } from "react-icons/fa";

const SummaryPage: React.FC = () => {
  const location = useLocation();
  const bookingDetails = location.state as {
    cruise: {
      name: string;
      image: string;
      description: string;
      rating: number;
      price: number;
      gallery: string[];
    };
    travelDate: string;
    numTravelers: number;
    userInfo: {
      name: string;
      email: string;
      phone: string;
    };
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [passengers, setPassengers] = useState<any[]>([]);
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [newPassenger, setNewPassenger] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleAddPassenger = () => {
    setPassengers((prevPassengers) => [...prevPassengers, newPassenger]);
    setShowPassengerForm(false); // Hide the form after adding the passenger
    setNewPassenger({ name: "", email: "", phone: "" }); // Reset the form
  };

  return (
    <div className="container mt-4">
      <h3>Booking Summary</h3>
      <div className="card">
        <div
          className="card-body"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {/* Image Section */}
          <div style={{ flex: "1 1 300px", marginRight: "20px" }}>
            <img
              src={bookingDetails.cruise.image}
              alt={bookingDetails.cruise.name}
              className="img-fluid"
              style={{ height: "300px", objectFit: "cover" }}
            />
          </div>

          {/* Text Details Section */}
          <div style={{ flex: "2 1 400px" }}>
            <h5>{bookingDetails.cruise.name}</h5>
            <p>{bookingDetails.cruise.description}</p>
            <p>
              <strong>Price:</strong> ₹{bookingDetails.cruise.price}
            </p>
            <p>
              <strong>Check-in Date:</strong> {bookingDetails.travelDate}
            </p>
            <p>
              <strong>Number of Travelers:</strong>{" "}
              {bookingDetails.numTravelers}
            </p>

            <h5>User Information</h5>
            <p>
              <strong>Name:</strong> {bookingDetails.userInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {bookingDetails.userInfo.email}
            </p>
            <p>
              <strong>Phone:</strong> {bookingDetails.userInfo.phone}
            </p>

            {/* Passenger Details Section */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <h5 style={{ margin: 0 }}>Passenger Details</h5>
              <button
                className="btn btn-primary"
                onClick={() => setShowPassengerForm(true)}
              >
                Add Passenger
              </button>
            </div>

            {/* Render the Passenger Form when showPassengerForm is true */}
            {showPassengerForm && (
              <div>
                <h5>Add Passenger</h5>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={newPassenger.name}
                      onChange={(e) =>
                        setNewPassenger({
                          ...newPassenger,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={newPassenger.email}
                      onChange={(e) =>
                        setNewPassenger({
                          ...newPassenger,
                          email: e.target.value,
                        })
                      }
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={newPassenger.phone}
                      onChange={(e) =>
                        setNewPassenger({
                          ...newPassenger,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Enter Mobile No"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddPassenger}
                  >
                    Add Passenger
                  </button>
                </form>
              </div>
            )}

            {/* Render List of Passengers */}
            {passengers.length > 0 && (
              <div>
                <h5>Passengers Added</h5>
                <ul>
                  {passengers.map((passenger, index) => (
                    <li key={index}>
                      {passenger.name} - {passenger.email} - {passenger.phone}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Payment Details Section */}
        <div
          style={{ position: "relative", marginTop: "20px", padding: "10px" }}
        >
          <h5>Payment Details</h5>
          <p>
            <strong>Price:</strong> ₹
            {bookingDetails.cruise.price * bookingDetails.numTravelers}
          </p>

          {/* Payment options */}
          <div
            className="payment-options"
            style={{ display: "flex", gap: "15px" }}
          >
            <button
              className={`btn ${
                selectedPaymentMethod === "phonepe"
                  ? "btn-primary"
                  : "btn-light"
              }`}
              onClick={() => setSelectedPaymentMethod("phonepe")}
            >
              <FaWallet style={{ marginRight: "8px" }} /> PhonePe
            </button>
            <button
              className={`btn ${
                selectedPaymentMethod === "upi" ? "btn-primary" : "btn-light"
              }`}
              onClick={() => setSelectedPaymentMethod("upi")}
            >
              UPI
            </button>
            <button
              className={`btn ${
                selectedPaymentMethod === "creditcard"
                  ? "btn-primary"
                  : "btn-light"
              }`}
              onClick={() => setSelectedPaymentMethod("creditcard")}
            >
              <FaCreditCard style={{ marginRight: "8px" }} /> Credit Card
            </button>
          </div>

          {/* Pay Now Button */}
          <button
            className="btn btn-primary"
            style={{
              position: "absolute",
              right: "20px",
              bottom: "20px",
            }}
            disabled={!selectedPaymentMethod}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
