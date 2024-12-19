import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../hook/axiosInstance";

const ViewDetailsLayer = () => {
  const location = useLocation();
  const { selectedCustomers } = location.state || {}; // Retrieve selectedCustomers from location.state
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [customerNumbers, setCustomerNumbers] = useState(
    (selectedCustomers || []).map((customer) => customer.contactNo || "")
  );

  // Ensure selectedCustomers is set correctly in useEffect
  useEffect(() => {
    if (selectedCustomers && selectedCustomers.length > 0) {
      setCustomerNumbers(
        selectedCustomers.map((customer) => customer.contactNo || "")
      );
    }
  }, [selectedCustomers]);

  const handlePhoneNumberChange = (index, value) => {
    const updatedNumbers = [...customerNumbers];
    updatedNumbers[index] = value;
    setCustomerNumbers(updatedNumbers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/sms/sendsms`, {
        message,
        selectedCustomers: selectedCustomers.map((customer, index) => ({
          ...customer,
          contactNo: customerNumbers[index],
        })),
      });
      setStatus({ type: "success", message: "Messages sent successfully!" });
      console.log(response.data);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data.message || "Failed to send messages",
      });
    }
  };

  return (
    <div className="sms-container">
      <h4>Send SMS</h4>
      {status && (
        <div className={`alert alert-${status.type}`}>{status.message}</div>
      )}

      <div className="selected-customers">
        <h5>Selected Customers</h5>
        <ul>
          {selectedCustomers?.map((customer, index) => (
            <li key={customer._id}>
              {customer.name}
              <input
                type="text"
                value={customerNumbers[index]}
                onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                className="form-control"
              />
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send SMS
        </button>
      </form>
    </div>
  );
};

export default ViewDetailsLayer;
