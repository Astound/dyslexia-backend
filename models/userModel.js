const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Add first name"],
    },
    lastName: {
      type: String,
      required: [true, "Add last name"],
    },
    class: {
      type: Number,
      required: [true, "Add class"],
    },
    dob: {
      type: Date,
      required: [true, "Add dob"],
    },
    email: {
      type: String,
      required: [true, "Add email"],
      unique: true,
    },
    completedTasks: {
      type: Array,
    },
    password: {
      type: String,
      required: [true, "Add password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
