const express = require("express");
const cors = require("cors");
require("dotenv").config();

const filesRoutes = require("./routes/files");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://fabulous-empathy-production-1d3c.up.railway.app",
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
};
app.use(cors(corsOptions));

// Routes
app.use("/api/files", filesRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error handling
app.use(errorHandler);

module.exports = app;
