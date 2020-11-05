module.exports = {
  async modMicro2(ejecutivo,cliente){
      let respuesta ={
       "fulfillmentText":ejecutivo + ", aquí va tu " + cliente.OrdenCliente + " cliente\nNombre: " + cliente.NombreCliente +"*DATOS PERSONALES*\n\nEdad: "+ cliente.Edad + "\nEstado Civil: " + cliente.EstadoCivil+ "\nHijos: " + cliente.Hijos + "\nVivienda: " + cliente.Vivienda+"\n*DATOS ECONOMICOS*\n\nActividad económica: " + cliente.ActividadEconomica +"\nSector económico: " + cliente.SectorEconomico + "\nMora del sector económico: " + cliente.MoraSectorEconomicoDias +" días" + "\nCantidad de operaciones activas: " + cliente.CantidadOperacionesActivas + "\nMonto cuota: $" + cliente.MontoCuotaDolar + "\nNumero de cuota: " + cliente.NumCuota + "\nSaldo Insoluto: $" + cliente.SaldoInsolutoDolar + "\nCiclo: " + cliente.Ciclo + "\nMora actual: " + cliente.MoraActualDias + " días" + "\nFecha próximo pago: " + cliente.FechaProximoPago + "\nMora Histórica en los últimos 12 meses: " + cliente.MoraHistorica12Meses +" días" + "\nMora mes anterior: " + cliente.MoraMesAnterior +" días" + "\nReestructurado: " + cliente.Reestructurado+ "\n*FAMILIARES Y GARANTES*\n\nNombre Garante:" + cliente.NombreGarante + "\nSu garante es familiar: " + cliente.GaranteFamilia + "\nTipo de garantía: " + cliente.TipoGarantia + "\nNúmero de familiares con mora: " + cliente.NumeroFamiliaresMora + "\nNúmero de familiares con castigo: " + cliente.NumeroFamiliaresCastigo+"\nEscribe OK para continuar",
       "fulfillmentMessages":[
        {
          "text": {
            "text": [
              ejecutivo + ", aquí va tu " + cliente.OrdenCliente + " cliente"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "Nombre: " + cliente.NombreCliente
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "A continuación te daremos información importante de este cliente. Por favor, léelo con detenimiento:"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "*DATOS PERSONALES*\n\nEdad: "+ cliente.Edad + "\nEstado Civil: " + cliente.EstadoCivil+ "\nHijos: " + cliente.Hijos + "\nVivienda: " + cliente.Vivienda
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "*DATOS ECONOMICOS*\n\nActividad económica: " + cliente.ActividadEconomica +"\nSector económico: " + cliente.SectorEconomico + "\nMora del sector económico: " + cliente.MoraSectorEconomicoDias +" días" + "\nCantidad de operaciones activas: " + cliente.CantidadOperacionesActivas + "\nMonto cuota: $" + cliente.MontoCuotaDolar + "\nNumero de cuota: " + cliente.NumCuota + "\nSaldo Insoluto: $" + cliente.SaldoInsolutoDolar + "\nCiclo: " + cliente.Ciclo + "\nMora actual: " + cliente.MoraActualDias + " días" + "\nFecha próximo pago: " + cliente.FechaProximoPago + "\nMora Histórica en los últimos 12 meses: " + cliente.MoraHistorica12Meses +" días" + "\nMora mes anterior: " + cliente.MoraMesAnterior +" días" + "\nReestructurado: " + cliente.Reestructurado 
            ]
          },
          "platform": "FACEBOOK"
        },/*
        {
          "text": {
            "text": [
              "*FAMILIARES Y GARANTES*\n\nNombre Garante:" + cliente.NombreGarante + "\nSu garante es familiar: " + cliente.GaranteFamilia + "\nTipo de garantía: " + cliente.TipoGarantia + "\nNúmero de familiares con mora: " + cliente.NumeroFamiliaresMora + "\nNúmero de familiares con castigo: " + cliente.NumeroFamiliaresCastigo
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "Escribe OK para continuar"
            ]
          },
          "platform": "FACEBOOK"
        },*/
        {
          "quickReplies": {
            "title": "*FAMILIARES Y GARANTES*\n\nNombre Garante:" + cliente.NombreGarante + "\nSu garante es familiar: " + cliente.GaranteFamilia + "\nTipo de garantía: " + cliente.TipoGarantia + "\nNúmero de familiares con mora: " + cliente.NumeroFamiliaresMora + "\nNúmero de familiares con castigo: " + cliente.NumeroFamiliaresCastigo,
            "quickReplies": [
              "Continuar"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              ejecutivo + ", aquí va tu " + cliente.OrdenCliente + " cliente\nNombre: " + cliente.NombreCliente +"*DATOS PERSONALES*\n\nEdad: "+ cliente.Edad + "\nEstado Civil: " + cliente.EstadoCivil+ "\nHijos: " + cliente.Hijos + "\nVivienda: " + cliente.Vivienda+"\n*DATOS ECONOMICOS*\n\nActividad económica: " + cliente.ActividadEconomica +"\nSector económico: " + cliente.SectorEconomico + "\nMora del sector económico: " + cliente.MoraSectorEconomicoDias +" días" + "\nCantidad de operaciones activas: " + cliente.CantidadOperacionesActivas + "\nMonto cuota: $" + cliente.MontoCuotaDolar + "\nNumero de cuota: " + cliente.NumCuota + "\nSaldo Insoluto: $" + cliente.SaldoInsolutoDolar + "\nCiclo: " + cliente.Ciclo + "\nMora actual: " + cliente.MoraActualDias + " días" + "\nFecha próximo pago: " + cliente.FechaProximoPago + "\nMora Histórica en los últimos 12 meses: " + cliente.MoraHistorica12Meses +" días" + "\nMora mes anterior: " + cliente.MoraMesAnterior +" días" + "\nReestructurado: " + cliente.Reestructurado+ "\n*FAMILIARES Y GARANTES*\n\nNombre Garante:" + cliente.NombreGarante + "\nSu garante es familiar: " + cliente.GaranteFamilia + "\nTipo de garantía: " + cliente.TipoGarantia + "\nNúmero de familiares con mora: " + cliente.NumeroFamiliaresMora + "\nNúmero de familiares con castigo: " + cliente.NumeroFamiliaresCastigo+"\nEscribe OK para continuar"
            ]
          }
        }
      ]
    }
      return respuesta;
  } 
}
