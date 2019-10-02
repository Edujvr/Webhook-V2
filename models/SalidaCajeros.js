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
  CausaSalida:{
        type: String,
        required:true
  },
  FechaSalida:{
        type: String,
        required:true
  },
  AdjHojaSalida:{
        type: String
  },
  AdjAutDebito:{
        type: String
  },
  CartaExamSalida:{
        type: String
  },
  CartaTermContrato:{
        type: String
  }
});

module.exports = mongoose.model("SalidaCajeros", SalidaCajerosSchema);
