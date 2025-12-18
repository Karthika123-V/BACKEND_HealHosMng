const Doctor = require("../../Models/doctorModel");

// CREATE
const createDoctor = async (req, res) => {
  try {
    const doctorData = {
      name: req.body.name,
      specialty: req.body.specialty,
      experience: req.body.experience,
      department: req.body.department,
      image: req.file ? req.file.path : null, // ✅ Cloudinary URL
    };

    const doctor = await Doctor.create(doctorData);

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ ALL
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ ONE
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateDoctor = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      specialty: req.body.specialty,
      experience: req.body.experience,
      department: req.body.department,
    };

    if (req.file) {
      updateData.image = req.file.path; // ✅ new Cloudinary image
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteDoctor = async (req, res) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
