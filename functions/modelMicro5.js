module.exports = {
  async modMicro5(frase){
      let respuesta ={
       "fulfillmentText":frase + ", Recuerda que puedes darte un descanso y regresar cuando tengas tiempo libre",
       "fulfillmentMessages":[
        /*{
          "text": {
            "text": [
              frase
            ]
          },
          "platform": "FACEBOOK"
        },*/
        {
          "quickReplies": {
            "title": frase//"Recuerda que puedes darte un descanso y regresar cuando tengas tiempo libre",
            "quickReplies": [
              "Continuar"
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              frase + ", Recuerda que puedes darte un descanso y regresar cuando tengas tiempo libre"
            ]
          }
        }
      ]
    }
      return respuesta;
  } 
}
