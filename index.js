'use estrict'

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(process.env.PORT || 8080);
var request = require('request');
const Colaboradores = require("./models/Colaboradores");
const Historial = require("./models/Historial");
// db instance connection
require("./config/db");

//Creación del metodo que escucha las llamadas POST y obtiene los parametros

app.post("/webhook",(req, res) =>{   
  //console.log(req.body.originalRequest)	
  const action = req.body.queryResult.action;
  const chatbase = require('@google/chatbase');
  const chatbase2= require('@google/chatbase');
  //const id = req.body.queryResult.outputContexts[0].parameters.facebook_sender_id;
  //var idUser = String(id);
  const outputContexts= req.body.queryResult.outputContexts[0].name;
  let session = (req.body.session);
  var respuesta = req.body.queryResult.fulfillmentText;
  const sessionId= session.substr(-36,36)
  var id = req.body.queryResult.outputContexts[0].parameters.facebook_sender_id;
  var idUser = String(id);
  console.log(outputContexts);
	
/*	
	if(outputContexts=='generic'){
		id = req.body.queryResult.outputContexts[0].parameters.facebook_sender_id;
  		idUser = String(id);
	}else{
		id = req.body.queryResult.outputContexts[1].parameters.facebook_sender_id;
  		idUser = String(id);
	}
*/	
	//Consulta nombre de Generalista en Mongo Atlas 
	if(action=='query'){
	console.log(req.body.queryResult.parameters.UsuariosRed);
		var query  = Colaboradores.where({ UsuarioRed: req.body.queryResult.parameters.UsuariosRed });
		query.findOne(function (err, colaboradores) {
		    if (err) {
		      res.status(500).send(err);
		    }
			respuesta = colaboradores.Nombre +" Tu consultor es " + colaboradores.NombreConsultor //+" Tu nombre " +usuarioName
			sendResponse(respuesta);
			sendAnalytics();
		  });
	 } else { //Envio de información directa webhook a Dialogflow	
		sendResponse(respuesta); 
		sendAnalytics();
	 }
		
	function sendAnalytics () {	
	//Creción del Objeto Json para almacenar en Mongo Atlas
		var historial = new Object();
		historial.SesionId = sessionId;
		historial.UsuarioId = id;
		historial.UsuarioDice = req.body.queryResult.queryText;
		historial.NombreIntento= req.body.queryResult.intent.displayName;
		historial.BotResponde= respuesta;	
		console.log(historial);

	//Envio de objeto con mensaje a Mongo Atlas
		let newHistorial = new Historial(historial);
		newHistorial.save(function (err) {
			if (err) return handleError(err);
		});
	
	// Creación mensaje Set de Usuario
	var messageSet = chatbase.newMessageSet()
	  .setApiKey("25a20150-b9b6-470c-9289-c793cb04b33c") // Chatbase API key
	  .setPlatform("Workplace") // Nombre de la Plataforma del Chat
	  .setVersion('2.1'); // La versión que el bot desplegado es

	// Mensaje del Usuario
	if (action == "nothandled") {
	messageSet.newMessage() // Crea una nueva instancia de Mensaje
	  .setAsTypeUser() // Marca como mensaje que viene del Usuario
	  .setUserId(idUser) // ID de usuario en la plataforma de chat 
	  .setTimestamp(Date.now().toString()) // Tiempo obtenido del sistema
	  .setIntent(req.body.queryResult.intent.displayName) // La intención decodificada a partir del mensaje del usuario
	  .setMessage(req.body.queryResult.queryText) // Mensaje de Usuario
	  .setAsNotHandled(); // Indica a Chatbase que marque esta solicitud de usuario como "no gestionada"(not handled)
	} else {
	  messageSet.newMessage() // Crea una nueva instancia de Mensaje
	  .setAsTypeUser() // Marca como mensaje que viene del Usuario
	  .setUserId(idUser) // ID de usuario en la plataforma de chat 
	  .setTimestamp(Date.now().toString()) // Tiempo obtenido del sistema
	  .setIntent(req.body.queryResult.intent.displayName) // La intención decodificada a partir del mensaje del usuario
	  .setMessage(req.body.queryResult.queryText) // Mensaje de Usuario
	  .setAsHandled(); // Marque esta solicitud como exitosamente manejada(handled)
	}

	// Envio de mensaje a Chatbase
	messageSet.sendMessageSet()
	  .then(messageSet => {
	    console.log(messageSet.getCreateResponse());
	  })
	  .catch(error => {
	    console.error(error);
	  });	
	
	// Creación mensaje Set del Bot
	var messageSet2 = chatbase.newMessageSet()
	  .setApiKey("25a20150-b9b6-470c-9289-c793cb04b33c") // Chatbase API key
	  .setPlatform("Workplace") // Nombre de la Plataforma del Chat
	  .setVersion('2.1'); // La versión que el bot desplegado es
	
	// Mensaje del Bot
	const botMessage = messageSet2.newMessage() // Crea una nueva instancia de Mensaje
	  .setAsTypeAgent() // Marca como mensaje que viene del Bot
	  .setUserId(idUser) // ID de usuario la misma que arriba
	  .setTimestamp(Date.now().toString()) // Tiempo obtenido del sistema
	  .setMessage(respuesta); // Mensaje de respuesta del Bot
	
	// Envio de mensaje a Chatbase
	messageSet2.sendMessageSet()
	  .then(messageSet => {
	    console.log(messageSet2.getCreateResponse());
	  })
	  .catch(error => {
	    console.error(error);
	});
	
}	
	//Envio de información webhook a Dialogflow Messenger
	function sendResponse (responseToUser) {
	    // if the response is a string send it as a response to the user
	    if (typeof responseToUser === 'string') {
	      let responseJson = {fulfillmentText: responseToUser}; // displayed response
	      console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
	      res.json(responseJson); // Send response to Dialogflow
	    } else {
	      // If the response to the user includes rich responses or contexts send them to Dialogflow
	      let responseJson = {};
	      // Define the text response
	      responseJson.fulfillmentText = responseToUser.fulfillmentText;
	      // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
	      if (responseToUser.fulfillmentMessages) {
		responseJson.fulfillmentMessages = responseToUser.fulfillmentMessages;
	      }
	      // Optional: add contexts (https://dialogflow.com/docs/contexts)
	      if (responseToUser.outputContexts) {
		responseJson.outputContexts = responseToUser.outputContexts;
	      }
	      // Send the response to Dialogflow
	      console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
	      res.json(responseJson);
	    }
	  }
	
    });
