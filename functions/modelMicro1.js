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
                  //"url": "https://video-iad3-1.xx.fbcdn.net/v/t42.27313-2/123489394_848177402678415_1450739458486580823_n.mp4?_nc_cat=104&vs=b9d19bb2b17300df&_nc_vs=HBksFQAYJEdISk1YQWVQRE11d2FRTURBRmMydk9UWkR5SVVickZxQUFBRhUAAsgBABUAGCRHQ1AyY1FlZVJOdU9SRjhCQU1kT1VRd0xSZkpoYnY0R0FBQUYVAgLIAQBLAogScHJvZ3Jlc3NpdmVfcmVjaXBlATEgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AFQAlABwAABgPMTAwMDMxMzE0NjAzODU2FtyQ%2BPKdgbABFQIoAkMzGAt2dHNfcHJldmlldxwXQHO7AgxJul4YLmRhc2hfYmFzaWNfcGFzc3Rocm91Z2hhbGlnbmVkX2hxMl9mcmFnXzJfdmlkZW8SABgYdmlkZW9zLnZ0cy5jYWxsYmFjay5wcm9kOBJWSURFT19WSUVXX1JFUVVFU1QbBIgVb2VtX3RhcmdldF9lbmNvZGVfdGFnBm9lcF9oZBNvZW1fcmVxdWVzdF90aW1lX21zDTE2MDUyMDUyODM2MTIMb2VtX2NmZ19ydWxlB3VubXV0ZWQTb2VtX3JvaV9yZWFjaF9jb3VudAIyMyUCHAAA&ccb=2&_nc_sid=a6057a&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ohc=yK6F5qFZMZsAX80r9rY&_nc_ht=video-iad3-1.xx&oh=1ea0750c5860b8cd8531eddb55d37b91&oe=5FADA221&_nc_rid=5168b14eab4d4e3&dl=1",
                  "url": "https://storage.googleapis.com/videos_pibot/video-1559162245.mp4",
                  "is_reusable":true
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
