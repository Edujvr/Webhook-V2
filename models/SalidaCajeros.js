const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalidaCajerosSchema = new Schema({
  createdOn: {
        type: Date,
        default: Date.now
  },
  SesionId:{
      type: String,
      required:true,
  },
  IdLS:{
        type: Number,
        required:true
  },
  NombreLS:{
        type: String,
        required:true
  },
  CorreoLS:{
        type: String,
        required:true
  },
  IdCajero:{
        type: String,
        required:true
  },
  NombreCajero:{
        type: String,
        required:true
  },
  MotivoSalida:{
        type: String,
        required:true
  },
  FechaSalida:{
        type: String,
        required:true
  },
  AdjCartaRenuncia:{
        type: String,
        required:true
  },
  AdjFormularioSalida: {
        type: String,
        required:true
  }
});

module.exports = mongoose.model("SalidaCajeros", SalidaCajerosSchema);
