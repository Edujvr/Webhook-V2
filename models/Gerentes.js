const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GerentesSchema = new Schema({
  NOMBRE:{
    type: String,
    required:true
  },  
  GERENTE_AGENCIA:{
    type: String,
    required:true
  },  
  JEFE_COMERCIAL_SERVICIOS:{
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
  },
  CONV_GERENTE_AGENCIA:{
    type: String,
    required:true
  }
});

module.exports = mongoose.model("Gerentes", GerentesSchema);
