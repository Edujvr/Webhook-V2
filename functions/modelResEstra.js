
module.exports = {
  async modResEstra(resp){
      let respuesta ={
       "fulfillmentText": resp,
       "outputContexts" : [{'name': req.body.session+'/contexts/microfinanzas-inicio-yes-next-followup','lifespanCount':1},{'name': req.body.session+'/contexts/microfinanzas-clientecontinuar-followup','lifespanCount':1},{'name': req.body.session+'/contexts/otraestrategia','lifespanCount':1}],
       "fulfillmentMessages":[
        {
          "text": {
            "text": [
              resp
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
              resp
            ]
          }
        }
      ]
    }
      return respuesta;
  } 
}
