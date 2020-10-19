const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CredifeSchema = new Schema({
  EMAIL: {
    type: String,
    required:true
  }, 
  DATO: {
    type : String,
    required:true
  }
});

module.exports = mongoose.model("Credife", CredifeSchema);
