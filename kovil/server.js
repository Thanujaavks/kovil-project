// Import necessary modules
import express from 'express'; // Import Express for creating the server and handling routes
import morgan from 'morgan'; // Import Morgan for logging HTTP requests
import dotenv from 'dotenv'; // Import dotenv for loading environment variables
import cors from 'cors'; // Import CORS for enabling Cross-Origin Resource Sharing
import cookieParser from 'cookie-parser'; // Import cookie-parser for handling cookies
import connectDB from './config/db.js'; // Import the database connection function
import routes from "./routes/index.js"; // Import application routes

// Load environment variables from the .env file
dotenv.config()

connectDB(); // Connect to the database

const port = process.env.PORT || 5000;  // Set the port for the server, using an environment variable or a default value


const app = express(); // Initialize the Express application

// Swagger
// Load env variables

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan('dev')); // Log HTTP requests in 'dev' format
app.use(cookieParser()); // Parse cookies attached to client requests
app.use(express.urlencoded({extended: true})); // Parse URL-encoded data
app.use(routes); // Use the imported routes for handling application endpoints

// Define a base route for testing the server
app.get('/', (req, res) => {
    res.send('Server is running');  // Respond with a confirmation message

})

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running  at http://localhost:${port}`); // Log the server URL
})
