const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GerentesSchema = new Schema({
  NOMBRE:{
    type: String,
    required:true
  },
  NOMBRE_REGIONAL_CANALES_SERV:{
    type: String,
    required:true
  },
  CEL_NOMBRE_REGIONAL_CANALES_SERV:{
    type: String,
    required:true
  },
  EXT_NOMBRE_REGIONAL_CANALES_SERV:{
    type: String,
    required:true
  },  
  NOMBRE_REGIONAL_NEGOCIO:{
    type: String,
    required:true
  },
  CEL_NOMBRE_REGIONAL_NEGOCIO:{
    type: String,
    required:true
  },
  EXT_NOMBRE_REGIONAL_NEGOCIO:{
    type: String,
    required:true
  },  
  GERENTE_AGENCIA:{
    type: String,
    required:true
  },
  CEL_GERENTE_AGENCIA:{
    type: String,
    required:true
  },
  EXT_GERENTE_AGENCIA:{
    type: String,
    required:true
  }
});

module.exports = mongoose.model("Gerentes", GerentesSchema);
