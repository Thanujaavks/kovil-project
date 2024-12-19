import asyncHandler from "express-async-handler";
import Customer from "../modals/customerModal.js";

const addCustomer = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        contactNo
    } = req.body;

    const customer = await Customer.create({
        name,
        email,
        contactNo})

    if (customer) {
        res.status(201).json(customer)
    } else {
        res.status(400).json({status: "FAILED", message: "Invalid Data"});

    }
});
const getCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.find({});
    res.status(200).json(customer)
});

const saveData = asyncHandler(async(req, res) => {
    try {
        const { data } = req.body;
    
        // Validate data format
        if (!data || !Array.isArray(data)) {
          return res.status(400).json({ message: "Invalid data format" });
        }
    
        // Insert each record into MongoDB
        const processedData = data.map((record) => ({
          name: record.name,
          email: record.email,
          contactNo: record.contactNo,
        }));
    
        await Customer.insertMany(processedData);
        res.status(200).json({ message: "Data uploaded successfully" });
      } catch (error) {
        console.error("Error saving data:", error.message || error); // Log the actual error
        res.status(500).json({ message: "Error saving data", error: error.message || error });
      }
});


export {addCustomer, getCustomer, saveData };