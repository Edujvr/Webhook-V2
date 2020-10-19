module.exports = {
  async modGeneralista(msj1,msj2){
      let respuesta ={
       "fulfillmentText":msj1 + msj2,
       "fulfillmentMessages":[
          {
             "text":{
                "text":[
                   msj1
                ]
             },
             "platform":"FACEBOOK",
             "lang":"es"
          },
          {
             "text":{
                "text":[
                   msj2
                ]
             },
             "platform":"FACEBOOK",
             "lang":"es"
          },
          {
             "text":{
                "text":[
                   msj1 + msj2
                ]
             },
             "lang":"es"
          }
       ]
    }
      return respuesta;
  } 
}
