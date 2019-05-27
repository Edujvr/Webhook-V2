
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReclamoSchema = new Schema({
  SUBTIPO:{
    type: String,
    required:true
  },
  VENTANA_DE_AYUDA: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model("Reclamo", ReclamoSchema);
