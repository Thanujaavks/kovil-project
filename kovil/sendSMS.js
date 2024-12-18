// Import the Twilio library
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  try {
    const message = await client.messages.create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: process.env.TWILIO_FROM_NUMBER, // Replace with your Twilio number
      to: "+16479130795", // Replace with the recipient's number
    });

    console.log(message.body);
  } catch (error) {
    console.error("Error creating message:", error);
  }
}

createMessage();
