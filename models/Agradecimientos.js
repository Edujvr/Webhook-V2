const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgradecimientosSchema = new Schema({
  createdOn: {
        type: Date,
        default: Date.now
  },
  SesionId:{
      type: String,
      required:true,
  },
  UsuarioId:{
        type: Number,
        required:true
      },
  NombreUsuarioGenerador:{
        type: String,
        required:true
  },
  UsuarioReceptor:{
        type: String,
        required:true
  },
  Comportamiento:{
        type: String,
        required:true
  },
  Descripción:{
        type: String,
        required:true
  },
  ArchivoAdjunto: {
        type: String
  }
});

module.exports = mongoose.model("Agradecimientos", AgradecimientosSchema);
