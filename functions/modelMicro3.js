module.exports = {
  async modMicro3(){
      let respuesta ={
       "fulfillmentText":"¿Necesitas información adicional del cliente para ejecutar una estrategia de cobranza?[SI\NO]",
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
              "¿Necesitas información adicional del cliente para ejecutar una estrategia de cobranza?[SI\NO]"
            ]
          }
        }
      ]
    }
      return respuesta;
  } 
}
