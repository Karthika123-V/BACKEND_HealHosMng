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

    // Validation
    if (!fullname || !email || !phone || !prefer_date || !prefer_time || !dept) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Map public form → admin-friendly schema
    const newAppointment = new Appointment({
      patientName: fullname,
      email,
      phone,
      department: dept,
      doctor: prefer_doctor || "Not Assigned",
      date: prefer_date,
      time: prefer_time,
      notes,
      status: "Pending"
    });


    const savedAppointment = await newAppointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: savedAppointment,
    });
  } catch (error) {
    console.error("Booking error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to book appointment",
      error: error.message
    });
  }
};
}

  };

module.exports = {
  bookAppointment,
};
