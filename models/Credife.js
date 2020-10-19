const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CredifeSchema = new Schema({
  EMAIL: {
    type: String,
    required:true
  },
  CLIENTES: {
    type: Array,
    required:true
  }
});

module.exports = mongoose.model("Credife", CredifeSchema);
