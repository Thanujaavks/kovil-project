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
})


export {addCustomer, getCustomer };