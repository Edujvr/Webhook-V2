const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MicrofinanzasSchema = new Schema({
  EMAIL: {
    type: String
  }, 
  CLIENTES: {
    type : Array
  }
});

module.exports = mongoose.model("Microfinanzas", MicrofinanzasSchema);
