const Appointment = require("../Models/appointmentModel");

const bookAppointment = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phone,
      prefer_date,
      prefer_time,
      dept,
      prefer_doctor,
      notes,
    } = req.body;

    const newAppointment = new Appointment({
      fullname,
      email,
      phone,
      prefer_date,
      prefer_time,
      dept,
      prefer_doctor,
      notes,
      status: "Pending"
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      data: savedAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  bookAppointment,
};
