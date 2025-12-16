const Doctor = require("../../Models/doctorModel");

// CREATE
const createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    const savedDoctor = await doctor.save();

    res.status(201).json({
      message: "Doctor added successfully",
      data: savedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add doctor",
      error: error.message,
    });
  }
};

// READ ALL
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json({
      message: "Doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};

// UPDATE
const updateDoctor = async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Doctor updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update doctor",
      error: error.message,
    });
  }
};

// DELETE
const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete doctor",
      error: error.message,
    });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
};
