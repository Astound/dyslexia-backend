// performance model schema
const mongoose = require("mongoose");

const performanceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Task",
    },
    sentenceStats: [
      {
        responseTimeForEachWord: {
          type: Array,
          required: true,
        },
        numberOfHintsUsed: {
          type: Number,
          required: true,
        },
        numberOfErrorsWhileReading: {
          type: Number,
          required: true,
        },
        numberOfErrorsWhileWriting: {
          type: Number,
          required: true,
        },
        numberofAudioReplays: {
          type: Number,
          required: true,
        },
        sentenceScore: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Performance", performanceSchema);
