import asyncHandler from "express-async-handler";
import Customer from "../modals/customerModal.js";
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendSms = asyncHandler(async (req, res) => {
    const { message, page = 1, limit = 10 } = req.body;  // Default to page 1 and limit 10 if not provided

    try {
        // Fetch customers with pagination
        const customers = await Customer.find()
            .skip((page - 1) * limit)  // Skip based on current page and limit
            .limit(Number(limit));  // Limit the number of results

        // Loop through the customers and send SMS
        const sendMessages = [];
        const invalidNumbers = [];
        for (const customer of customers) {
            try{
                const sendMessage = await client.messages.create({
                    body: message,
                    from: process.env.TWILIO_FROM_NUMBER,  // Twilio number
                    to: customer.contactNo,  // Assuming the customer model has a 'phone' field
                });
                sendMessages.push(sendMessage);
                console.log(`Message sent to ${customer.contactNo}: ${sendMessage.sid}`);
            }
            catch{
                invalidNumbers.push(customer.contactNo)
            }
        }

        res.status(200).json({
            message: "Messages sent successfully",
            messages: sendMessages,
            totalCustomers: customers.length,
            invalidNumbers,
            sendMessagesCount: sendMessages.length -1,
            page,
            limit,
        });
    } catch (error) {
        console.error("Error sending messages:", error);
        res.status(500).json({ message: "Error sending SMS", error: error.message });
    }
});



export {sendSms };