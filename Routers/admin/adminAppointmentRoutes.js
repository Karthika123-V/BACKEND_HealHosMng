const express = require("express");
const router = express.Router();

const {
  getAllAppointments,
} = require("../../Controllers/admin/adminAppointmentController");

router.get("/", getAllAppointments);

module.exports = router;
