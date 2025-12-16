const express = require("express");
const router = express.Router();

const { contactUs } = require("../Controllers/contactController");

router.post("/submit", contactUs);

module.exports = router;
