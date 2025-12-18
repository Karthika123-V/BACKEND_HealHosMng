const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");

// ===================== SIGNUP =====================
const signupUser = async (req, res) => {
  try {
    const { fullname, email, phone, password, role } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: fullname,            // ✅ FIX
      email,
      phone,
      password: hashedPassword,
      role: role || "Patient"
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      data: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
        role: savedUser.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ===================== LOGIN =====================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Successful login
    res.status(200).json({
      message: "Login successful",
      data: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// EXPORT BOTH FUNCTIONS
module.exports = {
  signupUser,
  loginUser,
};
