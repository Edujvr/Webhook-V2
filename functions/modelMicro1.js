module.exports = {
  async modMicro1(){
      let respuesta ={
       "fulfillmentText":"Bienvenid@ al piloto de Estrategias de cobranzas. Gracias por participar, tus respuestas nos ayudarán muchisimo.\nMi compañera Elizabeth te explicará cómo funciona este piloto con el siguiente video.\nVideo.\n¿List@ para empezar?[SI\NO]",
       "fulfillmentMessages":[
        {
          "text": {
            "text": [
              "Bienvenid@ al piloto de Estrategias de cobranzas. Gracias por participar, tus respuestas nos ayudarán muchisimo."
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "Mi compañera Elizabeth te explicará cómo funciona este piloto con el siguiente video."
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "payload": {
            "facebook": {
              "attachment": {
                "payload": {
                  "url": ""//"https://storage.googleapis.com/videos_pibot/video-1556059174.mp4"
                },
                "type": "video"
              }
            }
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "¿List@ para empezar?"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "payload": {
            "facebook": {
              "attachment": {
                "payload": {
                  "template_type": "list",
                  "elements": [
                    {
                      "buttons": [
                        {
                          "type": "postback",
                          "title": "SI",
                          "payload": "Si, empezar"
                        }
                      ],
                      "title": "Si, empezar"
                    },
                    {
                      "buttons": [
                        {
                          "type": "postback",
                          "title": "NO",
                          "payload": "No, no me queda claro lo que tengo que hacer"
                        }
                      ],
                      "title": "No, no me queda claro lo que tengo que hacer"
                    }
                  ],
                  "top_element_style": "compact"
                },
                "type": "template"
              }
            }
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              "Bienvenid@ al piloto de Estrategias de cobranzas. Gracias por participar, tus respuestas nos ayudarán muchisimo.\nMi compañera Elizabeth te explicará cómo funciona este piloto con el siguiente video.\nVideo.\n¿List@ para empezar?[SI\NO]"
            ]
          }
        }
      ]
    }
      return respuesta;
  } 
}
