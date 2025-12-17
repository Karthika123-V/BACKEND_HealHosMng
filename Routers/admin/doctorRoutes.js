const express = require("express");
const router = express.Router();
const upload = require("../../config/multerConfig");

const {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("../../Controllers/admin/doctorController");

router.post("/", upload.single("image"), createDoctor);
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", upload.single("image"), updateDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;
