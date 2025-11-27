require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//vehicleRoutes
const vehicleRoutes = require("./routes/vehicleroutes");
//driverRoutes
const driverRoutes = require("./routes/driverRoutes");
//authRoutes
const authRoutes = require("./routes/authRoutes");
//tripRoutes
const tripRoutes = require("./routes/tripRoutes");
//mainteancesRoutes
const maintenanceRoutes = require("./routes/mainteancesRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// Routes
//vehicle routes post and get for vehicle details
app.use("/api/vehicles", vehicleRoutes);
//Driver routes post for Driver details
app.use("/api/drivers", driverRoutes);
//auth Routes for login & signup
app.use("/api/auth", authRoutes);
//trip Routes
app.use("/api/tripSchedule", tripRoutes);
//mainteances Routes
app.use("/api/mainteances", maintenanceRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
