const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "🏥" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
