const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  department: { type: String, required: true },
  doctor: { type: String, default: "Not Assigned" },

  date: { type: String, required: true },
  time: { type: String, required: true },

  notes: { type: String },
  status: { type: String, default: "Pending" },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
