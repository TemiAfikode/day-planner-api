const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const mongoValidation = require("./validation/mongoValidation");

dotenv.config();

const isProd = process.env.NODE_ENV !== "development";

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     autoIndex: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch(() => {
//     console.log("Failed to connect to MongoDB");
//   });

mongoose
  .connect(isProd ? process.env.MONGODB_URI : process.env.MONGODB, {
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

const app = express();
app.use(cors("*"));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use("*", mongoValidation);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log("server listening on port " + port);
});
