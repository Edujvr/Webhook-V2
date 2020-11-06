
module.exports = {
  async modResEstra(resp,req){
      let aux= req.body.session
      console.log(aux)
      const aux2=aux.replace(('/',/\\/g));
    console.log(aux2)
      let respuesta ={
       "fulfillmentText": resp,
       "outputContexts" : [{'name': req.body.session+'\contexts\microfinanzas-inicio-yes-next-followup','lifespanCount':1},{'name': req.body.session+'\contexts\microfinanzas-clientecontinuar-followup','lifespanCount':1},{'name': req.body.session+'\contexts\otraestrategia','lifespanCount':1}],
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
