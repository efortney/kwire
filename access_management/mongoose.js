/**
 * database configuration
 */
const mongoose = require("mongoose");
require("../models/userSchema");
const { uri, password } = require("../config");
mongoose.Promise = global.Promise;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongodb connected..."))
  .catch((err) => console.error(err));
