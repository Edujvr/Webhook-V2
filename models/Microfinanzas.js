const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MicrofinanzasSchema = new Schema({
  EMAIL: {
    type: String
  }, 
  DATO: {
    type : String
  }
});

module.exports = mongoose.model("Microfinanzas", MicrofinanzasSchema);
