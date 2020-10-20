module.exports = {
  async modMicro4(frase){
      let respuesta ={
       "fulfillmentText":"Bienvenid@ al piloto de Estrategias de cobranzas. Gracias por participar, tus respuestas nos ayudarán muchisimo.\nMi compañera Elizabeth te explicará cómo funciona este piloto con el siguiente video.\nVideo.\n¿List@ para empezar?[SI\NO]",
       "fulfillmentMessages":[
        {
          "text": {
            "text": [
              frase
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "quickReplies": {
            "title": "Recuerda que puedes darte un descanso y regresar cuando tengas tiempo libre",
            "quickReplies": [
              "Continuar"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "Recuerda que puedes darte un descanso y regresar cuando tengas tiempo libre"
            ]
          }
        }
      ]
    }
      return respuesta;
  } 
}
