//database matching authentication with password encryption - decryption
require('dotenv').config();


const mongoose = require("mongoose");
const encryption = require("mongoose-encryption");


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});


const encKey = process.env.ENC_KEY;


userSchema.plugin(encryption, {
  secret: encKey,
  encryptedFields: ["password"]
});


module.exports = mongoose.model("User", userSchema);
