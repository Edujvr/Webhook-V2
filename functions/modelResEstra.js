
module.exports = {
  async modResEstra(resp,req){
      const aux= req.body.session
      const aux2=aux.replace(/\//g ,'\\');
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
        "outputContexts" : [{'name': req.body.session+'\contexts\microfinanzas-inicio-yes-next-followup','lifespanCount':1},{'name': req.body.session+'\contexts\microfinanzas-clientecontinuar-followup','lifespanCount':1},{'name': req.body.session+'\contexts\otraestrategia','lifespanCount':1}]
        // "outputContexts" : [{'name': aux2+'\contexts\microfinanzas-inicio-yes-next-followup','lifespanCount':1},{'name': aux2+'\contexts\microfinanzas-clientecontinuar-followup','lifespanCount':1},{'name': aux2+'\contexts\otraestrategia','lifespanCount':1}]
      }
      return respuesta;
  } 
}
