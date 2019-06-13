
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReclamoSchema = new Schema({
  TIPO:{
    type: String,
    required:true
  },
  AYUDA: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model("Reclamo", ReclamoSchema);
