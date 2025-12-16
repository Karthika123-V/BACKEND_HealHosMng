const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");

// ===================== SIGNUP =====================
const signupUser = async (req, res) => {
  try {
    const { fullname, email, phone, password, confirmpass } = req.body;

    // Check if email exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Check password match
    if (password !== confirmpass) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({
      fullname,
      email,
      phone,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully",
      data: {
        id: savedUser._id,
        fullname: savedUser.fullname,
        email: savedUser.email,
        phone: savedUser.phone,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Error while User Registration",
      error: error.message,
    });
  }
};


// ===================== LOGIN =====================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 3. Successful login
    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Error while Login",
      error: error.message,
    });
  }
};


// EXPORT BOTH FUNCTIONS
module.exports = {
  signupUser,
  loginUser,
};
