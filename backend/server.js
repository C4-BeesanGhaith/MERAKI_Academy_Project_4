const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");

app.use(cors());

app.use(express.json());

// Import Routers
const doctorsRouter = require("./routes/doctor");


// Routes Middleware
app.use("/doctors", doctorsRouter);


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
