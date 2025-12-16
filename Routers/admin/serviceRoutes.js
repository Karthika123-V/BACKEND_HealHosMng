const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
  updateService,
  deleteService,
} = require("../../Controllers/admin/serviceController");

router.post("/", createService);
router.get("/", getServices);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
