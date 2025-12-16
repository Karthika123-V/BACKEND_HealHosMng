const Appointment = require("../../Models/appointmentModel");

// =====================
// GET ALL APPOINTMENTS (ADMIN)
// =====================
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

module.exports = {
  getAllAppointments,
};
