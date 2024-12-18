import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { supabase } from "../../hook/supabaseClient";
import Papa from "papaparse";
import { Link } from "react-router-dom";

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

  const handleUpload = async () => {
    if (!file) return alert("Please select a CSV file.");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const data = results.data;
        setCsvData(data);

        // Insert data into the database
        const { data: insertedData, error } = await supabase.from("your_table_name").insert(data);

        if (error) {
          console.error("Error inserting data:", error);
          alert("Failed to upload data to the database.");
        } else {
          console.log("Inserted data:", insertedData);
          alert("Data uploaded successfully!");
        }
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
        alert("Failed to parse the CSV file.");
      },
    });
  };

  const handleClose = () => {
    setFileName("");
    setFile(null);
    setCsvData([]);
    alert("File upload canceled. Selection has been cleared.");
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
                  <h6 className="text-md text-primary-light mb-16">Upload CSV File</h6>
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
