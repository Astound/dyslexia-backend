const { default: mongoose } = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    // The title of the chat
    title: {
      type: String,
      required: true,
    },
    // Group or private chat
    isGroupChat: {
      type: Boolean,
      required: true,
      default: false,
    },
    // The user who created the chat
    createdBy: {
      type: String,
      required: true,
    },
    // The users in the chat
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "User",
    },
    //latest message
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Message",
    },

    // The time the message was sent
    time: {
      type: Date,
      required: true,
    },

    //group admin
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
