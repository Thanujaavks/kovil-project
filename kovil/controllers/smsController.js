import asyncHandler from "express-async-handler";
import Customer from "../modals/customerModal.js";
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


const getAccountBalance = asyncHandler(async (req, res) => {
    try {
        const balanceData = await client.balance.fetch(); // Correct Usage API endpoint

        // Debug log for better clarity
        console.log("Twilio Balance Data:", balanceData);

        res.status(200).json({
            balance: balanceData.balance,
            currency: balanceData.currency,
        });
    } catch (error) {
        console.error("Error fetching Twilio balance:", error);
        res.status(500).json({ message: "Error fetching Twilio balance", error: error.message });
    }
});

const sendSms = asyncHandler(async (req, res) => {
    const { message } = req.body;

    try {
        // Fetch all customers
        const customers = await Customer.find();

        // Loop through the customers and send SMS
        const sendMessages = [];
        const invalidNumbers = [];
        for (const customer of customers) {
            try {
                const sendMessage = await client.messages.create({
                    body: message,
                    from: process.env.TWILIO_FROM_NUMBER,
                    to: customer.contactNo,
                });
                sendMessages.push(sendMessage);
                console.log(`Message sent to ${customer.contactNo}: ${sendMessage.sid}`);
            } catch {
                invalidNumbers.push(customer.contactNo);
            }
        }

        res.status(200).json({
            message: "Messages sent successfully",
            messages: sendMessages,
            totalCustomers: customers.length,
            invalidNumbers,
            sendMessagesCount: sendMessages.length,
        });
    } catch (error) {
        console.error("Error sending messages:", error);
        res.status(500).json({ message: "Error sending SMS", error: error.message });
    }
});




export {sendSms, getAccountBalance };