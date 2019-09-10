
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReclamoSchema = new Schema({
  TIPOA:{
    type: String,
    required:true
  },
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
