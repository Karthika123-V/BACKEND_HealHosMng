const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// USER ROUTES
app.use("/api/user", require("./Routers/userRoutes"));
app.use("/api/contact", require("./Routers/contactRoutes"));
app.use("/api/appointment", require("./Routers/appointmentRoutes"));

// ADMIN ROUTES
app.use("/api/admin/departments", require("./Routers/admin/departmentRoutes"));
app.use("/api/admin/doctors", require("./Routers/admin/doctorRoutes"));
app.use("/api/admin/services", require("./Routers/admin/serviceRoutes"));
app.use("/api/admin/users", require("./Routers/admin/adminUserRoutes"));
app.use("/api/admin/appointments", require("./Routers/admin/adminAppointmentRoutes"));

// DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => {
    console.log("❌ MongoDB connection failed:", err.message);
    console.log("Please check your MONGO_URL in .env file");
  });

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
