import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Papa from "papaparse";
import { Link } from "react-router-dom";
import axiosInstance from "../../hook/axiosInstance";

const UploadFiles = () => {
  const [fileName, setFileName] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFileName(uploadedFile.name);
      setFile(uploadedFile);
    }
  };

  const handleClose = () => {
    setFileName("");
    setFile(null);
    setCsvData([]);
    alert("File upload canceled. Selection has been cleared.");
  };

  const validateCSVData = (data) => {
    return data.every(
      (record) =>
        record.name?.trim() && record.email?.trim() && record.contactNo?.trim()
    );
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    Papa.parse(file, {
      complete: (result) => {
        console.log("Parsed CSV Data:", result.data); // Log parsed data for verification

        const validRows = result.data.filter(
          (record) => record.name && record.email && record.contactNo
        );
        const invalidRows = result.data.filter(
          (record) => !record.name || !record.email || !record.contactNo
        );

        if (invalidRows.length > 0) {
          console.log("Invalid rows found:", invalidRows);

          // Create a readable formatted message for invalid rows
          const formattedInvalidRows = invalidRows
            .map((row, index) => {
              const name = row.name || "Missing name";
              const email = row.email || "Missing email";
              const contactNo = row.contactNo || "Missing contact number";
              return `Row ${
                index + 1
              } - Name: ${name}, Email: ${email}, Contact No: ${contactNo}`;
            })
            .join("\n");

          // Alert with more details on the invalid rows
          alert(
            `Invalid rows found:\n\n${formattedInvalidRows}\n\nEnsure all records have 'name', 'email', and 'contactNo'.`
          );
          return;
        }

        setCsvData(validRows);
        uploadDataToBackend(validRows);
      },
      header: true, // Assuming the CSV has headers
      skipEmptyLines: true, // Skip empty lines during parsing
      dynamicTyping: true, // Automatically convert types (e.g., numbers)
    });
  };

  const uploadDataToBackend = async (data) => {
    // Filter out records missing required fields
    const filteredData = data.filter(
      (record) => record.name && record.email && record.contactNo
    );
  
    // Log filtered data to the console for debugging
    console.log("Filtered Data:", filteredData);
  
    if (filteredData.length === 0) {
      alert(
        "No valid data to upload. Ensure all records have 'name', 'email', and 'contactNo'."
      );
      return;
    }
  
    try {
      // Sending the parsed CSV data to the backend
      const response = await axiosInstance.post('/customers/saveData', {
        data: filteredData,
      });
  
      console.log("Data uploaded successfully:", response.data);
      alert("Data uploaded successfully");
    } catch (error) {
      // Enhanced error handling
      console.error("Error uploading data:", error);
  
      // Check if the error has a response (i.e., the request was made and the server responded with an error)
      if (error.response) {
        console.error('Response status:', error.response.status); // Log the status code
        console.error('Response data:', error.response.data); // Log the response body
        alert(`Error uploading data: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        alert('Error uploading data: No response received from the server.');
      } else {
        // Something went wrong during the setup of the request
        console.error('Error setting up request:', error.message);
        alert(`Error uploading data: ${error.message}`);
      }
    }
  };
  

  return (
    <MasterLayout>
      <div className="card h-100 p-0 radius-12">
        <div className="card-body p-24">
          <div className="d-flex align-items-center justify-content-end gap-3 mb-3 mr-10 px-5">
            <Link
              to="/users-list"
              className="btn btn-primary text-md btn-sm px-20 py-12 radius-8 d-flex align-items-center gap-2"
            >
              Back
            </Link>
          </div>
          <div className="row justify-content-center">
            <div className="col-xxl-6 col-xl-8 col-lg-10">
              <div className="card border mb-5">
                <div className="card-body">
                  <h6 className="text-md text-primary-light mb-16">
                    Upload CSV File
                  </h6>
                  <div className="mb-24 mt-16">
                    <form>
                      <label
                        htmlFor="file-upload-csv"
                        className="mb-16 border border-neutral-600 fw-medium text-secondary-light px-16 py-12 radius-12 d-inline-flex align-items-center gap-2 bg-hover-neutral-200"
                      >
                        <Icon
                          icon="solar:upload-linear"
                          className="text-xl"
                        ></Icon>
                        Click to upload
                        <input
                          type="file"
                          accept=".csv"
                          className="form-control w-auto mt-24 form-control-lg"
                          id="file-upload-csv"
                          hidden
                          onChange={handleFileChange}
                        />
                      </label>
                      {fileName && (
                        <p className="text-primary-600 fw-semibold mt-3">
                          Selected file: {fileName}
                        </p>
                      )}
                    </form>
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                      type="button"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default UploadFiles;
