import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../hook/axiosInstance";

const UsersListLayer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [itemsPerPage] = useState(10); // Items per page
  const navigate = useNavigate();

  const handleFileUpload = () => {
    navigate("/upload-files");
  };

  useEffect(() => {
    axiosInstance
      .get(`/customers/getCustomer`)
      .then((res) => {
        console.log(res.data);
        setCustomerList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get the total pages
  const totalPages = Math.ceil(customerList.length / itemsPerPage);

  // Get the current page's data
  const currentData = customerList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
              onClick={handleFileUpload}
            >
              <Icon icon="lucide:upload" className="icon text-xl" />
            </button>
            <span className="text-info-600 fw-semibold">Upload File</span>
          </div>
          <Link
            to="/add-user"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Add New Customer
          </Link>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact No</th>
              </tr>
            </thead>
            <tbody>
              {currentData
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((data, index) => (
                  <tr key={data._id}>
                    {" "}
                    {/* Use unique ID for key */}
                    <th scope="row">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </th>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <span className="text-md mb-0 fw-normal text-secondary-light">
                            {data.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {data.email}
                      </span>
                    </td>
                    <td>{data.contactNo}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, customerList.length)} of{" "}
            {customerList.length} entries
          </span>
          <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px text-md"
                to="#"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <Icon icon="ep:d-arrow-left" />
              </Link>
            </li>
            {/* Dynamic pagination links */}
            {[...Array(totalPages).keys()].map((page) => (
              <li className="page-item" key={page + 1}>
                <Link
                  className={`page-link ${
                    currentPage === page + 1
                      ? "bg-primary-600 text-white"
                      : "bg-neutral-200 text-secondary-light"
                  } fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md`}
                  to="#"
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </Link>
              </li>
            ))}
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px text-md"
                to="#"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <Icon icon="ep:d-arrow-right" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsersListLayer;
