const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgradecimientoSchema = new Schema({
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
  },
  createdOn: {
        type: Date,
        default: Date.now
  }
});

module.exports = mongoose.model("Agradecimientos", AgradecimientoSchema);
