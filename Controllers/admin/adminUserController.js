const User = require("../../Models/userModel");
const mongoose = require("mongoose");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ONE USER
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User fetched", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE USER (name, email, role)
const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const newUser = new User({ name, email, role: role || "Patient" });
    const savedUser = await newUser.save();

    res.status(201).json({ success: true, message: "User created successfully", data: savedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updateData = { name, email, role };

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Check if ID exists and is not undefined/null/empty
    if (!id || id === 'undefined' || id === 'null') {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
