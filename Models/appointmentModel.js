const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  // Core required fields (for both admin and public)
  patientName: { type: String, required: true },
  department: { type: String, required: true },
  date: { type: String, required: true },
  
  // Optional contact fields (provided by public booking)
  email: { type: String },
  phone: { type: String },
  
  // Doctor assignment
  doctor: { type: String, default: "Not Assigned" },
  
  // Time slot (optional)
  time: { type: String },
  
  // Additional fields
  notes: { type: String },
  status: { type: String, default: "Pending" },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
