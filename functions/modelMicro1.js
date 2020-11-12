module.exports = {
  async modMicro1(){
      let respuesta ={
       "fulfillmentText":"Bienvenid@ al piloto de Estrategias de cobranzas. Gracias por participar, tus respuestas nos ayudarán muchisimo.Te recomendamos usar tu computadora para una mejor experiencia\nMi compañera Elizabeth te explicará cómo funciona este piloto con el siguiente video.\nVideo.\n¿List@ para empezar?[SI\NO]",
       "fulfillmentMessages":[
        {
          "text": {
            "text": [
              "Bienvenid@ al piloto de Estrategias de cobranzas. Gracias por participar, tus respuestas nos ayudarán muchisimo. Te recomendamos usar tu computadora para una mejor experiencia"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "A continuación te mostraré un video que te explicará cómo funciona este piloto. Espérame unos segundos mientras lo cargo"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "payload": {
            "facebook": {
              "attachment": {
                "payload": {
                  "url": "https://storage.googleapis.com/videos_pibot/Piloto2_final_01.mp4"
                },
                "type": "video"
              }
            }
          },
          "platform": "FACEBOOK"
        }, 
        {
          "payload": {
            "facebook": {
              "text": "¿List@ para empezar?",
              "quick_replies": [
                {
                  "content_type": "text",
                  "payload": "Si, empezar",
                  "title": "SI"
                },
                {
                  "content_type": "text",
                  "payload": "No, no me queda claro",
                  "title": "NO"
                }
              ]
            }
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "Bienvenid@ al piloto de Estrategias de cobranzas. Gracias por participar, tus respuestas nos ayudarán muchisimo.Te recomendamos usar tu computadora para una mejor experiencia\nMi compañera Elizabeth te explicará cómo funciona este piloto con el siguiente video.\nVideo.\n¿List@ para empezar?[SI\NO]"
            ]
          }
        }
      ]
    }
      return respuesta;
  } 
}
