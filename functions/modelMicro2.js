module.exports = {
  async modMicro2(ejecutivo,cliente){
      let respuesta ={
       "fulfillmentText":"Bienvenid@ al piloto de Estrategias de cobranzas. Gracias por participar, tus respuestas nos ayudarán muchisimo.\nMi compañera Elizabeth te explicará cómo funciona este piloto con el siguiente video.\nVideo.\n¿List@ para empezar?[SI\NO]",
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
              "Nombre: cliente.NombreCliente"
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
              "*DATOS PERSONALES*\n\nEdad: "+ cliente.Edad + "\nEstado Civil:" + cliente.EstadoCivil+ "\nHijos: " + cliente.Hijos + "\nVivienda: " + cliente.Vivienda
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "*DATOS ECONOMICOS*\n\nActividad económica:\nSector económico:\nMora del sector económico:\nCantidad de operaciones activas:\nMonto cuota:\nNumero de cuota\nSaldo Insoluto:\nCiclo:\nMora actual en días:\nFecha próximo pago:\nMora Histórica en los últimos 12 meses:"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "*FAMILIARES Y GARANTES*\n\nNombre Garante:\nSu garante es familia:\nTipo de garantía:\nNúmero de familiares con mora:\nNúmero de familiares con castigo:"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "quickReplies": {
            "title": "¡Listo!",
            "quickReplies": [
              "Continuar"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              ""
            ]
          }
        }
      ]
    }
      return respuesta;
  } 
}
