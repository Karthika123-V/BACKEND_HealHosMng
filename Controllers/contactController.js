const Contact = require("../Models/contactModel");

const contactUs = async (req, res) => {
  try {
    const { fullname, email, phone, message } = req.body;

    const newContact = new Contact({
      fullname,
      email,
      phone,
      message,
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      message: "Contact form submitted successfully",
      data: savedContact,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  contactUs,
};
