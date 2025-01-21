import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; // Import Stripe components

const API_URL = import.meta.env.VITE_APP_API_URL as string;

interface PassengerDetailsFormData {
  name: string;
  age: number;
  gender: string;
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

const PaymentDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookingDetails, bookingId } = location.state as {
    bookingDetails: BookingDetails;
    bookingId: number;
  };

  const { formData, passengers } = bookingDetails;

  const [fare, setFare] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>(""); // Track selected payment method

  const stripe = useStripe();
  const elements = useElements();

  // Fetch fare on component mount
  useEffect(() => {
    const fetchFare = async () => {
      console.log("Fetching fare for booking details:", bookingDetails);
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${API_URL}/payment/getFare`, {
          source: formData.source,
          destination: formData.destination,
          vehicleType: formData.vehicleType,
          date: formData.date,
          passengers,
        });

        console.log("Fare fetched successfully:", response.data);
        setFare(response.data); // Store the fare in state
      } catch (err) {
        console.error("Error fetching fare:", err);
        setError("Failed to fetch fare. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFare();
  }, [formData.source, formData.destination, formData.vehicleType, formData.date, passengers]);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      alert("Stripe has not loaded yet. Please try again.");
      return;
    }

    if (!fare) {
      alert("Fare is not available.");
      return;
    }

    const fareToBeCalculated = fare * 100;

    setLoading(true);
    try {
      // Step 1: Create PaymentIntent
      const { data } = await axios.post(`${API_URL}/stripe/payment/create-intent`,{
        "amount": 5000.0,
        "currency": "usd",
        "booking_id": 123456,
        "payment_method": "card"
      });

      const { clientSecret } = data;

      // Step 2: Confirm the PaymentIntent with Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        alert("Card Element not found. Please try again.");
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(`Payment failed: ${error.message}`);
        alert("Payment failed. Please try again.");
      } else if (paymentIntent) {
        console.log("Payment successful:", paymentIntent);

        // Step 3: Update payment status on the backend
        const paymentId = paymentIntent.id;
        const confirmPaymentStatus = await axios.put(
          `${API_URL}/stripe/payment/update-status/${paymentId}?status=COMPLETED`
        );

        console.log("Payment status updated:", confirmPaymentStatus);

        // Step 4: Send email confirmation for booking
        try {
          const sendMail = await axios.post(`${API_URL}/mail/${bookingId}`);
          console.log("Mail sent successfully:", sendMail);
        } catch (mailError) {
          console.error("Error sending mail:", mailError);
        }

        alert("Payment successful! Your booking is confirmed.");
        navigate("/BookingHistory"); // Redirect to booking history
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Payment Details</h3>
        </div>
        <div className="card-body">
          <h5>Route Details:</h5>
          <p>
            <strong>Source:</strong> {formData.source} <br />
            <strong>Destination:</strong> {formData.destination} <br />
            <strong>Vehicle Type:</strong> {formData.vehicleType} <br />
            <strong>Travel Date:</strong> {formData.date}
          </p>

          <h5>Passenger Details:</h5>
          {passengers.map((passenger, index) => (
            <div key={index}>
              <p>
                <strong>Passenger {index + 1}:</strong> {passenger.name}, Age: {passenger.age}, Gender: {passenger.gender}
              </p>
            </div>
          ))}

          <h5>
            {loading ? (
              <span>Loading fare...</span>
            ) : error ? (
              <span className="text-danger">{error}</span>
            ) : fare !== null ? (
              <span>
                <strong>Fare: </strong> ₹{fare}
              </span>
            ) : (
              <span>Calculating fare...</span>
            )}
          </h5>

          <h5>Enter Payment Details:</h5>
          <div className="form-group">
            <CardElement />
          </div>

          <div className="d-flex justify-content-between">
            <button
              onClick={handlePayment}
              className="btn btn-success"
              disabled={loading || !fare}
            >
              {loading ? "Processing Payment..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
