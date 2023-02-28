//mongoose message schema

const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  // The user who sent the message
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  // The chat the message was sent in
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Chat",
  },
  // The message content
  content: {
    type: String,
    required: true,
  },
  // The time the message was sent
  time: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
