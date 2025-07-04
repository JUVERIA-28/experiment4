const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = 3000;

// Middleware to allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Access OpenWeatherMap API Key from .env file
const API_KEY = process.env.API_KEY;  // Get the API key from environment variables

// Route to fetch weather by city name
app.get("/weather/:city", async (req, res) => {
  try {
    const city = req.params.city; // Get the city from the URL parameter
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // Send a GET request to the OpenWeatherMap API
    const response = await axios.get(url);
    res.json(response.data);  // Return the weather data as JSON
  } catch (error) {
    // If the API returns an error (e.g., invalid city, 401, 404, etc.)
    if (error.response) {
      // If the API returned an error response (e.g., 401 Unauthorized, 404 Not Found)
      res.status(error.response.status).json({ error: error.response.data.message });
    } else {
      // If it's a network or other type of error
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
