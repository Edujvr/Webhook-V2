const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CredifeSchema = new Schema({
  EMAIL: {
    type: String,
    required:true
  }, DATO:{type : String}
  /*
  CLIENTES: [
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
   {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
   {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
   {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
    {
      OrdenCliente:{type:String},
      NombreCliente:{type:String},
      Edad:{type:String},
      EstadoCivil:{type:String},
      Hijos:{type:String},
      Vivienda:{type:String},
      ActividadEconomica:{type:String},
      SectorEconomico:{type:String},
      CantidadOperacionesActivas:{type:String},
      MontoCuotaDolar:{type:String},
      NumCuota:{type:String},
      SaldoInsolutoDolar:{type:String},
      Ciclo:{type:String},
      MoraActualDias:{type:String},
      FechaProximoPago:{type:String},
      MoraHistoricaDias:{type:String},
      NombreGarante:{type:String},
      GaranteFamilia:{type:String},
      TipoGarantia:{type:String},
      NumeroFamiliaresMora:{type:String},
      NumeroFamiliaresCastigo:{type:String},
      FraseMotivadora:{type:String},
      Confirmacion:{type:String}
    },
  ]*/
});

module.exports = mongoose.model("Credife", CredifeSchema);
