const Service = require("../../Models/serviceModel");

// CREATE
const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    const savedService = await service.save();

    res.status(201).json({
      message: "Service created successfully",
      data: savedService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create service",
      error: error.message,
    });
  }
};

// READ ALL
const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json({
      message: "Services fetched successfully",
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch services",
      error: error.message,
    });
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

    res.status(200).json({
      message: "Service updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update service",
      error: error.message,
    });
  }
};

// DELETE
const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete service",
      error: error.message,
    });
  }
};

module.exports = {
  createService,
  getServices,
  updateService,
  deleteService,
};
