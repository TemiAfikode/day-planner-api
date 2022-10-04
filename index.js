const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes');
const mongoValidation = require('./validation/mongoValidation');

dotenv.config()

mongoose.connect(process.env.MONGODB, {
    autoIndex: true,
}).then(() => { console.log('Connected to MongoDB'); }).catch(() => { console.log('Failed to connect to MongoDB'); });

const app = express();
app.use(cors('*'))

app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)

app.use('*', mongoValidation)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 9000;

app.listen(port,() => {console.log("server listening on port " + port);});