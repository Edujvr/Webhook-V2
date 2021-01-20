const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userFBSchema = new Schema({
  NOMBRE:{
        type: String,
        required:true
  },
  MAIL:{
    type: String,
    required:true
  },
  ID: {
    type: String,
    required:true
  },
  CONFIR: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model("userFB", userFBSchema);
