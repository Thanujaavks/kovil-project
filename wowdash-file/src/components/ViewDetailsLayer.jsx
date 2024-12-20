import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
        <h4 className="mb-0">Selected Customers</h4>
        {status && (
          <div className={`alert alert-${status.type} mb-0`}>
            {status.message}
          </div>
        )}
        <div className="d-flex align-items-center gap-3">
          <Link
            to="/email"
            className="btn btn-primary text-md btn-sm px-20 py-12 radius-8 d-flex align-items-center gap-2"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="card-body px-24 py-16">
        <div className="selected-customers mb-4">
          <ul className="list-unstyled">
            {selectedCustomers?.map((customer, index) => (
              <li
                key={customer._id}
                className="mb-3 d-flex align-items-center gap-3 w-50"
              >
                <span className="customer-name" style={{ flex: 1 }}>
                  {customer.name}
                </span>
                <input
                  type="text"
                  value={customerNumbers[index]}
                  onChange={(e) =>
                    handlePhoneNumberChange(index, e.target.value)
                  }
                  className="form-control w-50"
                  placeholder="Enter phone number"
                />
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 d-flex align-items-center gap-3 w-75">
            <h6 className="mb-0" style={{ flex: 1 }}>
              Type Message
            </h6>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="form-control"
              rows="4"
              style={{ flex: 2 }}
            />
          </div>
          <div className="d-flex justify-content-end w-75">
            <button type="submit" className="btn btn-primary">
              Send SMS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewDetailsLayer;
