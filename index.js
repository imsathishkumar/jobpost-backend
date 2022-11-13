require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const auth = require("./routes/auth/auth");
const middleAuth = require("./middleware/auth");
const company = require("./routes/company/company");
const professional = require("./routes/professional/professional");
var expressWinston = require('express-winston');
var winston = require('winston');

mongoose.connect(process.env.MONGO_URL)
  .then(()=> console.log("Connected to MongoDB..."))
  .catch(err=> console.log("Could not connect to MongoDB..."))

app.use(express.json());
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));
app.use(cors());
app.use('/',auth);
app.use('/',middleAuth,company);
app.use('/',middleAuth,professional);

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

const port = process.env.PORT || 4000;
app.listen(port,()=>console.log(`Api is work in http://localhost:${port}`));