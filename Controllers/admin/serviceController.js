const Service = require("../../Models/serviceModel");
const mongoose = require("mongoose");

// CREATE
const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    const savedService = await service.save();

    res.status(201).json({ success: true, message: "Service created successfully", data: savedService });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ ALL
const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json({ success: true, message: "Services fetched successfully", data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ ONE
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.status(200).json({ success: true, message: "Service fetched", data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
const updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.status(200).json({ success: true, message: "Service updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Check if ID exists and is not undefined/null/empty
    if (!id || id === 'undefined' || id === 'null') {
      return res.status(400).json({ success: false, message: "Service ID is required" });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid service ID format" });
    }

    const deleted = await Service.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
