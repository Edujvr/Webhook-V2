module.exports = {
  async modMicro3(){
      let respuesta ={
       "fulfillmentText":"¿Necesitas información adicional del cliente para ejecutar una estrategia de cobranza?[SI\NO]",
       "fulfillmentMessages":[
        {
          "quickReplies": {
            "title": "Antes de despedirme además de la información que te mostramos ¿Te gustaría que en el futuro agreguemos información adicional del cliente para ejecutar una estrategia de cobranza?",
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
              "¿Necesitas información adicional del cliente para ejecutar una estrategia de cobranza?[SI\NO]"
            ]
          }
        }
      ]
    }
      return respuesta;
  } 
}
