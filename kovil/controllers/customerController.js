import asyncHandler from "express-async-handler";
import Customer from "../modals/customerModal.js";

const addCustomer = asyncHandler(async (req, res) => {
  const { name, email, contactNo } = req.body;

  const customer = await Customer.create({
    name,
    email,
    contactNo,
  });

  if (customer) {
    res.status(201).json(customer);
  } else {
    res.status(400).json({ status: "FAILED", message: "Invalid Data" });
  }
});
const getCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.find({});
  res.status(200).json(customer);
});

const getCustomerCount = asyncHandler(async(req, res) => {
  try {
    const customerCount = await Customer.countDocuments();
    res.status(200).json({customerCount})
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
// Function to save customer data from CSV
const saveData = asyncHandler(async (req, res) => {
  const { data } = req.body;  // Data sent from the frontend

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ status: "FAILED", message: "Invalid data format" });
  }

  try {
    // Create customers in bulk using the provided data
    const customers = await Customer.insertMany(data);
    
    if (customers.length > 0) {
      res.status(201).json({
        status: "SUCCESS",
        message: `${customers.length} customers uploaded successfully.`,
        data: customers,
      });
    } else {
      res.status(400).json({ status: "FAILED", message: "No valid data to upload." });
    }
  } catch (error) {
    console.error("Error saving customer data:", error);
    res.status(500).json({ status: "FAILED", message: "Internal server error." });
  }
});




export { addCustomer, getCustomer, saveData, getCustomerCount };
