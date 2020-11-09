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
        }/*,
        {
          "text": {
            "text": [
              "Acá aparecera un video Tutorial"
            ]
          },
          "platform": "FACEBOOK"
        }*/,
        {
          "payload": {
            "facebook": {
              "attachment": {
                "payload": {
                  "url": "https://www.dropbox.com/s/a7isrsx9waoqcb9/El%20tema%20a%20tratar%20el%20d%C3%ADa%20de%20hoy%20es_%20%20_Inteligencia%20Artificial_%20Usos%20y%20aplicaci....mp4?dl=1"
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
