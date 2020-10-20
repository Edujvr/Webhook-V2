module.exports = {
  async modMicro4(){
      let respuesta ={
       "fulfillmentText":"Bienvenid@ al piloto de Estrategias de cobranzas. Gracias por participar, tus respuestas nos ayudarán muchisimo.\nMi compañera Elizabeth te explicará cómo funciona este piloto con el siguiente video.\nVideo.\n¿List@ para empezar?[SI\NO]",
       "fulfillmentMessages":[
        {
          "text": {
            "text": [
              "Cuéntanos, qué estrategia de cobranza aplicarías con este cliente:"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "payload": {
            "facebook": {
              "attachment": {
                "type": "template",
                "payload": {
                  "elements": [
                    {
                      "buttons": [
                        {
                          "type": "postback",
                          "payload": "No requiere aplicar gestión",
                          "title": "Seleccionar"
                        }
                      ],
                      "title": "No requiere aplicar gestión"
                    },
                    {
                      "buttons": [
                        {
                          "type": "postback",
                          "payload": "Preventivo cliente buen perfil",
                          "title": "Seleccionar"
                        }
                      ],
                      "title": "Preventivo cliente buen perfil"
                    },
                    {
                      "buttons": [
                        {
                          "payload": "Preventivo cliente mal perfil",
                          "type": "postback",
                          "title": "Seleccionar"
                        }
                      ],
                      "title": "Preventivo cliente mal perfil"
                    }
                  ],
                  "top_element_style": "compact",
                  "template_type": "list"
                }
              }
            }
          },
          "platform": "FACEBOOK"
        },
        {
          "payload": {
            "facebook": {
              "attachment": {
                "type": "template",
                "payload": {
                  "top_element_style": "compact",
                  "elements": [
                    {
                      "title": "Mensaje preventivo refinanciado",
                      "buttons": [
                        {
                          "type": "postback",
                          "payload": "Mensaje preventivo refinanciado",
                          "title": "Seleccionar"
                        }
                      ]
                    },
                    {
                      "title": "Mensaje cliente con mora",
                      "buttons": [
                        {
                          "type": "postback",
                          "title": "Seleccionar",
                          "payload": "Mensaje cliente con mora"
                        }
                      ]
                    },
                    {
                      "title": "Llamada",
                      "buttons": [
                        {
                          "payload": "Llamada",
                          "title": "Seleccionar",
                          "type": "postback"
                        }
                      ]
                    }
                  ],
                  "template_type": "list"
                }
              }
            }
          },
          "platform": "FACEBOOK"
        },
        {
          "payload": {
            "facebook": {
              "attachment": {
                "type": "template",
                "payload": {
                  "elements": [
                    {
                      "title": "Visita",
                      "buttons": [
                        {
                          "type": "postback",
                          "title": "Seleccionar",
                          "payload": "Visita"
                        }
                      ]
                    },
                    {
                      "title": "Visita con administrador",
                      "buttons": [
                        {
                          "payload": "Visita con administrador",
                          "title": "Seleccionar",
                          "type": "postback"
                        }
                      ]
                    },
                    {
                      "title": "Otra",
                      "buttons": [
                        {
                          "title": "Seleccionar",
                          "payload": "Otra estrategia de cobranzas",
                          "type": "postback"
                        }
                      ]
                    }
                  ],
                  "template_type": "list",
                  "top_element_style": "compact"
                }
              }
            }
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
