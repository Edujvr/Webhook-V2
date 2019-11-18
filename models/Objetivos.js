const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjetivosSchema = new Schema({
  MAIL: {
    type: String,
    required:true
  },
  INDICADORES: {
    type: Array,
    required:true
  }
});

module.exports = mongoose.model("Objetivos", ObjetivosSchema);
