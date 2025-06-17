import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DummyPayment.css';

const API = import.meta.env.VITE_BACKEND_URL;

const DummyPayment = () => {
  const [step, setStep] = useState(1);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleCardSubmit = () => {
    if (!cardNumber || !expiry || !cvv) {
      alert('Please fill in all card details.');
      return;
    }
    setStep(2);
  };

  const handleOtpSubmit = async () => {
    if (!otp) {
      alert('Please enter the OTP.');
      return;
    }

    const bookingId = localStorage.getItem('bookingId');
    if (!bookingId) {
      alert('Booking ID not found. Please try booking again.');
      return;
    }

    try {
      const res = await fetch(`${API}/api/bookings/${bookingId}/pay`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Payment update failed');
      }

      alert('✅ Payment completed successfully!');
      localStorage.removeItem('bookingId');
      navigate('/mybookings');
    } catch (error) {
      alert(`❌ Payment error: ${error.message}`);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        {step === 1 && (
          <>
            <h3>💳 Enter Card Details</h3>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength="16"
            />
            <div className="expiry-cvv">
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                maxLength="5"
              />
              <input
                type="password"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength="3"
              />
            </div>
            <button onClick={handleCardSubmit}>Proceed to OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <h3>🔐 Enter OTP</h3>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
            />
            <button onClick={handleOtpSubmit}>Complete Payment</button>
          </>
        )}
        <p className="note">This is a dummy payment screen for demo purposes only.</p>
      </div>
    </div>
  );
};

export default DummyPayment;
