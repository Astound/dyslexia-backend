const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to " + conn.connection.host);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
