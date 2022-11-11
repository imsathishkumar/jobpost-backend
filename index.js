require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const auth = require("./routes/auth/auth");
const middleAuth = require("./middleware/auth");
const company = require("./routes/company/company");
const professional = require("./routes/professional/professional");

mongoose.connect(process.env.MONGO_URL)
  .then(()=> console.log("Connected to MongoDB..."))
  .catch(err=> console.log("Could not connect to MongoDB..."))

app.use(express.json());
app.use(cors());
app.use('/',auth);
app.use('/',middleAuth,company);
app.use('/',middleAuth,professional);
const port = process.env.PORT || 4000;
app.listen(port,()=>console.log(`Api is work in http://localhost:${port}`));