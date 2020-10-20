module.exports = {
  async modMicro3(){
      let respuesta ={
       "fulfillmentText":"Bienvenid@ al piloto de Estrategias de cobranzas. Gracias por participar, tus respuestas nos ayudarán muchisimo.\nMi compañera Elizabeth te explicará cómo funciona este piloto con el siguiente video.\nVideo.\n¿List@ para empezar?[SI\NO]",
       "fulfillmentMessages":[
        {
          "quickReplies": {
            "title": "¿Necesitas información adicional del cliente para ejecutar una estrategia de cobranza?",
            "quickReplies": [
              "SI",
              "NO"
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
