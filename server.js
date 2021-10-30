const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');

const MongoDBURI = process.env.MONGO_URI
mongoose.connect(MongoDBURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, (err) => {
  if(err) console.log("can't connect to db")
  else console.log("connected to db successfully")
});

const app = express();

const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("build"));
app.use(cors())

require('./routes')(app);

app.listen(PORT, () => {
  console.log(`The server listening at http://localhost: ${PORT}`);
});

module.exports = app;
