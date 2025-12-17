const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  // Public booking fields
  fullname: { type: String },
  email: { type: String },
  phone: { type: String },
  prefer_date: { type: String },
  prefer_time: { type: String },
  dept: { type: String },
  prefer_doctor: { type: String },
  notes: { type: String },
  // Admin-friendly fields
  patientName: { type: String, required: true },
  doctor: { type: String, required: true },
  department: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
