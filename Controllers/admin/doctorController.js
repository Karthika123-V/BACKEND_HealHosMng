const Doctor = require("../../Models/doctorModel");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Helper function to delete image file
const deleteImageFile = (imagePath) => {
  if (imagePath) {
    const fullPath = path.join(__dirname, "../../", imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
};

// CREATE
const createDoctor = async (req, res) => {
  try {
    const doctorData = {
      name: req.body.name,
      specialty: req.body.specialty,
      experience: req.body.experience,
      department: req.body.department,
    };

    // If image is uploaded, add the path
    if (req.file) {
      doctorData.image = `/uploads/${req.file.filename}`;
    }

    const doctor = new Doctor(doctorData);
    const savedDoctor = await doctor.save();

    res.status(201).json({ success: true, message: "Doctor added successfully", data: savedDoctor });
  } catch (error) {
    // If error occurs and file was uploaded, delete it
    if (req.file) {
      deleteImageFile(`/uploads/${req.file.filename}`);
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ ALL
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ success: true, message: "Doctors fetched successfully", data: doctors });
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
    res.status(200).json({ success: true, message: "Doctor fetched", data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateDoctor = async (req, res) => {
  try {
    // Find the existing doctor
    const existingDoctor = await Doctor.findById(req.params.id);
    
    if (!existingDoctor) {
      // If new file was uploaded but doctor not found, delete the file
      if (req.file) {
        deleteImageFile(`/uploads/${req.file.filename}`);
      }
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const updateData = {
      name: req.body.name,
      specialty: req.body.specialty,
      experience: req.body.experience,
      department: req.body.department,
    };

    // If new image is uploaded
    if (req.file) {
      // Delete old image if it exists
      if (existingDoctor.image) {
        deleteImageFile(existingDoctor.image);
      }
      // Set new image path
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Doctor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ success: true, message: "Doctor updated successfully", data: updated });
  } catch (error) {
    // If error occurs and new file was uploaded, delete it
    if (req.file) {
      deleteImageFile(`/uploads/${req.file.filename}`);
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Check if ID exists and is not undefined/null/empty
    if (!id || id === 'undefined' || id === 'null') {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid doctor ID format" });
    }

    const deleted = await Doctor.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Delete associated image file if exists
    if (deleted.image) {
      deleteImageFile(deleted.image);
    }

    res.status(200).json({ success: true, message: "Doctor deleted successfully" });
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
