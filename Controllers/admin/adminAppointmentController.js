const Appointment = require("../../Models/appointmentModel");
const mongoose = require("mongoose");

// CREATE APPOINTMENT (Admin)
const createAppointment = async (req, res) => {
  try {
    const { patientName, doctor, department, date, time, email, phone, notes, status } = req.body;

    // Validate required fields
    if (!patientName || !department || !date) {
      return res.status(400).json({ 
        success: false, 
        message: "Patient name, department, and date are required" 
      });
    }

    const newAppointment = new Appointment({
      patientName,
      department,
      date,
      doctor: doctor || "Not Assigned",
      time: time || '',
      email: email || '',
      phone: phone || '',
      notes: notes || '',
      status: status || "Pending"
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json({ 
      success: true, 
      message: "Appointment created successfully", 
      data: savedAppointment 
    });
  } catch (error) {
    console.error("Admin create appointment error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message,
      error: error.name === 'ValidationError' ? error.errors : undefined
    });
  }
};

// GET ALL APPOINTMENTS
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, message: "Appointments fetched successfully", data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ONE APPOINTMENT
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({ success: true, message: "Appointment fetched", data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE APPOINTMENT (mainly for status)
const updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, message: "Appointment updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE APPOINTMENT
const deleteAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Check if ID exists and is not undefined/null/empty
    if (!id || id === 'undefined' || id === 'null') {
      return res.status(400).json({ success: false, message: "Appointment ID is required" });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid appointment ID format" });
    }

    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};

