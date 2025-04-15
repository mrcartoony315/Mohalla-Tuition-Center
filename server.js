const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// const adminRoutes = require('./routes/adminRoute');

const app = express();

app.listen(3000, () => console.log("Server started successfully ....!!!"));

app.use(express.json());

app.use(require("./routes/route"));
// app.use("./routes/adminRoute.js", adminRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB is connected successfully....!!!!"))
  .catch((err) => console.log(err));

  //process.env.MONGODB_URL