const Appointment = require("../Models/appointmentModel");

const bookAppointment = async (req, res) => {
  try {
    console.log("📥 Received appointment booking request:", req.body);
    
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

    // Validate required fields for public booking
    const missingFields = [];
    if (!fullname) missingFields.push('fullname');
    if (!phone) missingFields.push('phone');
    if (!prefer_date) missingFields.push('prefer_date');
    if (!dept) missingFields.push('dept');

    if (missingFields.length > 0) {
      console.log("❌ Validation failed. Missing fields:", missingFields);
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields
      });
    }

    // Map public booking fields to appointment schema
    const appointmentData = {
      patientName: fullname,
      department: dept,
      date: prefer_date,
      email: email || '',
      phone: phone,
      time: prefer_time || '',
      doctor: prefer_doctor || "Not Assigned",
      notes: notes || '',
      status: "Pending"
    };

    console.log("📝 Creating appointment with data:", appointmentData);

    const newAppointment = new Appointment(appointmentData);
    const savedAppointment = await newAppointment.save();
    
    console.log("✅ Appointment saved successfully - ID:", savedAppointment._id);

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully! We'll contact you soon.",
      data: savedAppointment,
    });
  } catch (error) {
    console.error("❌ Booking error:", error);
    
    // Return detailed error for debugging
    const errorResponse = {
      success: false,
      message: "Failed to book appointment"
    };

    // Include validation errors if present
    if (error.name === 'ValidationError') {
      errorResponse.message = "Validation failed";
      errorResponse.errors = Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      }));
    } else {
      errorResponse.error = error.message;
    }

    res.status(500).json(errorResponse);
  }
};




module.exports = {
  bookAppointment,
};
