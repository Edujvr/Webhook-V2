const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CredifeSchema = new Schema({
  EMAIL: {
    type: String,
    required:true
  },
  CLIENTES: [String
    /*{
      OrdenCliente:String,
      NombreCliente:String,
      Edad:String,
      EstadoCivil:String,
      Hijos:String,
      Vivienda:String,
      ActividadEconomica:String,
      SectorEconomico:String,
      CantidadOperacionesActivas:String,
      MontoCuotaDolar:String,
      NumCuota:String,
      SaldoInsolutoDolar:String,
      Ciclo:String,
      MoraActualDias:String,
      FechaProximoPago:String,
      MoraHistoricaDias:String,
      NombreGarante:String,
      GaranteFamilia:String,
      TipoGarantia:String,
      NumeroFamiliaresMora:String,
      NumeroFamiliaresCastigo:String,
      FraseMotivadora:String,
      Confirmacion:String
    */}
  ]
});

module.exports = mongoose.model("Credife", CredifeSchema);
