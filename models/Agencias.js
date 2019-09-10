
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgenciaSchema = new Schema({
  CC:{
    type: String,
    required:true
  },
  NOMBRE:{
    type: String,
    required:true
  },
  PROVINCIA: {
    type: String,
    required:true
  },
  CIUDAD: {
    type: String,
    required:true
  },
  DIRECCION: {
    type: String,
    required:true
  },
  REFERENCIA: {
    type: String,
    required:true
  },
  TELF_1: {
    type: String,
    required:true
  },
  TELF_2: {
    type: String,
    required:true
  },
  H_SEMANA: {
    type: String,
    required:true
  },
  H_SABADO: {
    type: String,
    required:true
  },
  H_DOMINGO: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model("Agencia", AgenciaSchema);
