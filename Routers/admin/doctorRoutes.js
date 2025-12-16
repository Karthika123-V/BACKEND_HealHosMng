const express = require("express");
const router = express.Router();

const {
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
} = require("../../Controllers/admin/doctorController");

router.post("/", createDoctor);
router.get("/", getDoctors);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;
