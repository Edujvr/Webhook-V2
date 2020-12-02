const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColaboradoresSchema = new Schema({
  NOMBRE:{
        type: String,
        required:true
  },/*
  PUESTO: {
    type: String,
    required:true
  },
  NUMERO_IDENTIFICACION: {
    type: String,
    required:true
  },
    NOMBRE_SUPERVISOR: {
    type: String,
    required:true
  },*/
  CODIGO_EMPLEADO: {
    type: String,
    required:true
  },
  EMAIL_EMPLEADO: {
    type: String,
    required:true
  },
  NOMBRE_CONSULTOR: {
    type: String,
    required:true
  },
  USUARIO_MODASA: {
    type: String,
    required:true
  },
  CLAVE_MODASA: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model("Colaboradores", ColaboradoresSchema);
