const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phone: String,
  prefer_date: String,
  prefer_time: String,
  dept: String,
  prefer_doctor: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
