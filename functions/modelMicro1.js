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
                  "url": "https://video-iad3-1.xx.fbcdn.net/v/t42.9040-2/125191912_1289181491480886_1530675541922460430_n.mp4?_nc_cat=109&ccb=2&_nc_sid=985c63&efg=eyJybHIiOjMwMCwicmxhIjo1MTIsInZlbmNvZGVfdGFnIjoibGVnYWN5X3NkIn0%3D&_nc_ohc=xamMB7G3PlsAX93-qEB&rl=300&vabr=85&_nc_ht=video-iad3-1.xx&oh=ed5a70c4f011e4bb3389851ac50e71ac&oe=5FAD9C27&dl=1"
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
