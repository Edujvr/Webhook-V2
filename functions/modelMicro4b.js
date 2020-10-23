module.exports = {
  async modMicro4(){
      let respuesta ={
       "fulfillmentText":"Bienvenid@ al piloto de Estrategias de cobranzas. Gracias por participar, tus respuestas nos ayudarán muchisimo.\nMi compañera Elizabeth te explicará cómo funciona este piloto con el siguiente video.\nVideo.\n¿List@ para empezar?[SI\NO]",
       "fulfillmentMessages":[
        {
          "text": {
            "text": [
              "Gracias por tu feedback. Analizaremos la posibilidad de agregar este dato"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "Ahora sí cuéntanos, qué estrategia de cobranza aplicarías con este cliente:\n1.- No requiere gestión\n2.- Mensaje preventivo cliente buen perfil\n3.- Mensaje preventivo cliente mal perfil\n4.- Mensaje preventivo reestructurado\n5.- Mensaje cliente con mora\n6.- Llamada cliente\n7.- Llamada garante o familiar\n8.- Visita clientes\n9.- Visita garante o familiar\n10.- Visita con administrador a cliente\n11.- Visita con administrador a garante o familiar\n12.- Otra"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "Escribe el número de  la estrategia que elegirías"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "ok"
            ]
          }
        }
      ]
    }
      return respuesta;
  } 
}
