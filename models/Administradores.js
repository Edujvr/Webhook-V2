const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdministradorSchema = new Schema({
  NOMBRE:{
    type: String,
    required:true
  },
  ADMINISTRADOR_COMERCIAL:{
    type: String,
    required:true
  },
  CEL_ADMINISTRADOR_COMERCIAL:{
    type: String,
    required:true
  },
  EXT_ADMINISTRADOR_COMERCIAL:{
    type: String,
    required:true
  },  
  ADMINISTRADOR_SERVICIOS:{
    type: String,
    required:true
  },
  CEL_ADMINISTRADOR_SERVICIOS:{
    type: String,
    required:true
  },
  EXT_ADMINISTRADOR_SERVICIOS:{
    type: String,
    required:true
  },  
  ADMINISTRADOR_COMERCIAL_SERVICIOS:{
    type: String,
    required:true
  },
  CEL_ADMINISTRADOR_COMERCIAL_SERVICIOS:{
    type: String,
    required:true
  },
  EXT_ADMINISTRADOR_COMERCIAL_SERVICIOS:{
    type: String,
    required:true
  },  
  ESPECIALISTA_COMERCIAL_SERVICIOS:{
    type: String,
    required:true
  },
  CEL_ESPECIALISTA_COMERCIAL_SERVICIOS:{
    type: String,
    required:true
  },
  EXT_ESPECIALISTA_COMERCIAL_SERVICIOS:{
    type: String,
    required:true
  }
});

module.exports = mongoose.model("Administrador", AdministradorSchema);
