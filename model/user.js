const mongoose = require("mongoose");
const Schema = mongoose.Schema;

userSchema = new Schema({
  username: String,
  artists: [
    {
      type: String,
    },
  ],
});
User = mongoose.model("User", userSchema);

module.exports = User;
