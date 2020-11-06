
module.exports = {
  async modResEstra(respuesta){
      let respuesta ={
       "fulfillmentText": respuesta,
       "outputContexts" : [{'name': req.body.session+'/contexts/microfinanzas-inicio-yes-next-followup','lifespanCount':1},{'name': req.body.session+'/contexts/microfinanzas-clientecontinuar-followup','lifespanCount':1},{'name': req.body.session+'/contexts/otraestrategia','lifespanCount':1}],
       "fulfillmentMessages":[
        {
          "text": {
            "text": [
              respuesta
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              respuesta
            ]
          }
        }
      ]
    }
      return respuesta;
  } 
}
