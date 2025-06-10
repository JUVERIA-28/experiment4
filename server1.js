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

// Get the OpenWeatherMap API Key from environment variables
const API_KEY = process.env.API_KEY; // Use API key from .env file

// Route to fetch weather by city name
app.get("/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);
    res.json(response.data); // Send the weather data in the response
  } catch (error) {
    if (error.response) {
      // If the OpenWeather API returns an error response
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
