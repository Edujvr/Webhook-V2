
module.exports = {
  async modResEstra(resp,req){
    console.log(resp)
      let respuesta ={
       "fulfillmentText":  String(resp),
       "fulfillmentMessages":[
        {
          "text": {
            "text": [
              String(resp)
            ]
          },
          "platform": "FACEBOOK"
        },
        {
          "text": {
            "text": [
               String(resp)
            ]
          }
        }
      ],
      "outputContexts" : [{'name': req.body.session+'/contexts/microfinanzas-inicio-yes-next-followup','lifespanCount':1},{'name': req.body.session+'/contexts/microfinanzas-clientecontinuar-followup','lifespanCount':1},{'name': req.body.session+'/contexts/otraestrategia','lifespanCount':1}]
      }
      return respuesta;
  } 
}
