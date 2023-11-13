const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const formData = require("form-data");
const mongoose = require("mongoose");
const config = require("./config");
require('dotenv').config();
const corsOption={
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
//const cors = require("cors");
app.use(cors());

mongoose
  .connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => console.error(err));
mongoose.set("debug", true);

app.use(helmet());
app.use(cors());
// app.use('/',router)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin");
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  res.append("Access-Control-Allow-Content-Type", "application/json");
  next();
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.render("index"); // index refers to index.ejs
});

app.use(require("./routes"));

app.use(function (err, req, res, next) {
  console.error("error handeler:", err);
  if (err) {
    res.status(err.status || 500).json({
      error: true,
      message: err.message || err.errors || err,
      results: {},
    });
  } else {
    res.status(500).json({
      error: true,
      message: "something went wrong",
      results: {},
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is listening on PORT: ${PORT}`));
