import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL
// Define the structure for passenger details and booking details
interface PassengerDetailsFormData {
  name: string;
  age: number;
  gender: string;
  email?: string;
  mobile?: string;
}

interface BookingDetails {
  routeId: number;
  formData: {
    source: string;
    destination: string;
    vehicleType: string;
    date: string;
  };
  passengers: PassengerDetailsFormData[];
}

const ConfirmBooking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the booking details from location.state
  const { bookingDetails } = location.state as { bookingDetails: BookingDetails };

  const { routeId, formData, passengers } = bookingDetails;

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Redirect to home if booking details are missing
    if (!bookingDetails) {
      alert("Booking details are missing. Please try again.");
      navigate("/Ground/homepage");
    }
  }, [bookingDetails, navigate]);

  // Handle booking confirmation and redirect to payment
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      source: formData.source,
      destination: formData.destination,
      vehicleType: formData.vehicleType,
      date: formData.date,
      passengers: passengers.map((passenger) => ({
        name: passenger.name,
        age: passenger.age,
        gender: passenger.gender,
      })),
    };

    try {
      // Make the POST request to confirm the booking
      const response = await axios.post(`${API_URL}/booking/add`, bookingData);

      if (response.status === 200 && response.data.bookingId) {
        const bookingId = response.data.bookingId; // Extract bookingId from the response
        alert("Booking confirmed successfully!");

        // Navigate to payment page and pass booking details along with bookingId
        navigate("/payment-details", {
          state: { bookingDetails, bookingId },
        });
      } else {
        alert("Booking confirmed but booking ID is missing in the response.");
      }
    } catch (error) {
      alert("Booking failed. Please try again.");
      console.error("Error confirming booking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Confirm Booking</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleBookingSubmit}>
            {/* Display route details */}
            <div className="mb-3">
              <h5>Route Details</h5>
              <p>
                <strong>Source:</strong> {formData.source} <br />
                <strong>Destination:</strong> {formData.destination} <br />
                <strong>Vehicle Type:</strong> {formData.vehicleType} <br />
                <strong>Travel Date:</strong> {formData.date}
              </p>
            </div>

            {/* Display passenger details */}
            <div className="mb-3">
              <h5>Passenger Details</h5>
              {passengers.map((passenger, index) => (
                <div key={index}>
                  <p>
                    <strong>Passenger {index + 1}:</strong> {passenger.name}, Age: {passenger.age}, Gender: {passenger.gender}
                    <br />
                    {passenger.email && <><strong>Email:</strong> {passenger.email}<br /></>}
                    {passenger.mobile && <><strong>Mobile:</strong> {passenger.mobile}<br /></>}
                  </p>
                </div>
              ))}
            </div>

            {/* Submit button */}
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Processing Booking..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
