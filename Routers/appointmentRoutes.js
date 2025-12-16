const express = require("express");
const router = express.Router();

const { bookAppointment } = require("../Controllers/appointmentController");

router.post("/book", bookAppointment);

module.exports = router;
