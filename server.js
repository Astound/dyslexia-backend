const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");

const port = 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", require("./routes/userRoutes"));
app.use("/teacher", require("./routes/teacherRoutes"));
// app.use("/task", require("./routes/taskRoutes"));

app.listen(port, () => {
  console.log("server started");
});
