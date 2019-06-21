const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdministradorSchema = new Schema({
  NOMBRE:{
    type: String,
    required:true
  },
  ADMINISTRADOR_COMERCIAL : {
    type: String
  },
  CEL_ADMINISTRADOR_COMERCIAL : {
    type: String
  },
  EXT_ADMINISTRADOR_COMERCIAL : {
    type: String
  },  ADMINISTRADOR_SERVICIOS : {
    type: String
  },
  CEL_ADMINISTRADOR_SERVICIOS : {
    type: String
  },
  EXT_ADMINISTRADOR_SERVICIOS : {
    type: String
  },  ADMINISTRADOR_COMERCIAL_SERVICIOS : {
    type: String
  },
  CEL_ADMINISTRADOR_COMERCIAL_SERVICIOS : {
    type: String
  },
  EXT_ADMINISTRADOR_COMERCIAL_SERVICIOS : {
    type: String
  },  ESPECIALISTA_COMERCIAL_SERVICIOS : {
    type: String
  },
  CEL_ESPECIALISTA_COMERCIAL_SERVICIOS : {
    type: String
  },
  EXT_ESPECIALISTA_COMERCIAL_SERVICIOS  : {
    type: String
  }
});

module.exports = mongoose.model("Administrador", AdministradorSchema);
