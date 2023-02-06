const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Add first name"],
    },
    lastName: {
      type: String,
      required: [true, "Add last name"],
    },
    email: {
      type: String,
      required: [true, "Add email"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
