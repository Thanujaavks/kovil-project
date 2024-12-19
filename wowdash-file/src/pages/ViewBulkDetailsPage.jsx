import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ViewDetailsLayer from "../components/ViewDetailsLayer";
import ViewBulkDetails from "../components/ViewBulkDetails";


const ViewBulkDetailsPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Components / Email" />

        {/* ViewDetailsLayer */}
        <ViewBulkDetails />

      </MasterLayout>

    </>
  );
};

export default ViewBulkDetailsPage; 
