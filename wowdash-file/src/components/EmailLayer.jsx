import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../hook/axiosInstance";

const EmailLayer = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get(`/customers/getCustomer`);
        setCustomers(response.data);
        setSelectedCustomers(Array(response.data.length).fill(false)); // Initialize selection state
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
    setSelectedCustomers(customers.map(() => !selectAll)); // Toggle selection
  };

  const handleCheckboxChange = (index) => {
    const updatedSelection = [...selectedCustomers];
    updatedSelection[index] = !updatedSelection[index];
    setSelectedCustomers(updatedSelection);
    setSelectAll(updatedSelection.every((isSelected) => isSelected)); // Update selectAll status
  };

  return (
    <div className="row gy-4">
      <div className="col-xxl-12">
        <div className="card h-100 p-0 email-card">
          <div className="card-header border-bottom bg-base py-16 px-24">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-4">
              <div className="d-flex align-items-center gap-3">
                <div className="form-check style-check d-flex align-items-center">
                  <input
                    className="form-check-input radius-4 border input-form-dark"
                    type="checkbox"
                    name="checkbox"
                    id="selectAll"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  <label htmlFor="selectAll" className="ms-2">
                    Select All
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            <ul className="overflow-x-auto">
              {customers
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((data, index) => (
                    <li
                      key={data._id}
                      className="email-item px-24 py-16 d-flex gap-4 align-items-center border-bottom cursor-pointer bg-hover-neutral-200 min-w-max-content"
                    >
                      <div className="form-check style-check d-flex align-items-center">
                        <input
                          className="form-check-input radius-4 border border-neutral-400"
                          type="checkbox"
                          name="checkbox"
                          checked={selectedCustomers[index] || false}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </div>
                      <button
                        type="button"
                        className="starred-button icon text-xl text-secondary-light line-height-1 d-flex"
                      >
                        <Icon
                          icon="ph:star"
                          className="icon-outline line-height-1"
                        />
                        <Icon
                          icon="ph:star-fill"
                          className="icon-fill line-height-1 text-warning-600"
                        />
                      </button>
                      <Link
                        to={`/view-details/${data._id}`}
                        className="text-primary-light fw-medium text-md text-line-1 w-190-px"
                      >
                        {data.name}
                      </Link>
                      <span className="text-secondary-light ms-auto">
                        {new Date(data.createdAt).toLocaleString()}
                      </span>
                    </li>
                  ))}
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailLayer;
