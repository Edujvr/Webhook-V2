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
  var respuesta = req.body.queryResult.fulfillmentText;
	
	//Consulta nombre de Generalista en Mongo Atlas 
	if(action=='query'){
		var query  = Colaboradores.where({ UsuarioRed: req.body.queryResult.outputContexts.parameters.UsuariosRed });
		query.findOne(function (err, colaboradores) {
		    if (err) {
		      res.status(500).send(err);
		    }
			respuesta = colaboradores.Nombre +" Tu consultor es " + colaboradores.NombreConsultor //+" Tu nombre " +usuarioName
			sendResponse(respuesta);
			sendAnalytics();
		  });
	 } else { //Envio de información directa webhook a Dialogflow		  
	    res.json({
		    messages: req.body.queryResult.fulfillmentMessages,
		    speech: respuesta,
		    displayText: respuesta,
		    contextOut: req.body.queryResult.outputContexts
       		 });
			sendAnalytics();
	 }
		

function sendAnalytics () {	
//Creción del Objeto Json para almacenar en Mongo Atlas
  var historial = new Object();
  historial.UsuarioId = req.body.originalRequest.data.sender.id; //falta definir con ID usuario de workplace
  historial.UsuarioDice = req.body.queryResult.queryText;
  historial.NombreIntento= req.body.queryResult.intent.displayName;
  historial.BotResponde= respuesta;	
  console.log(historial)
	
	
//Envio de objeto con mensaje a Mongo Atlas
	let newHistorial = new Historial(historial);
	  newHistorial.save((err, task) => {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.status(201).json(historial);
	  });
	
	// Creación mensaje Set de Usuario
	var messageSet = chatbase.newMessageSet()
	  .setApiKey("f8be6699-d8b4-44d8-90cb-07d8d2e98cf2") // Chatbase API key
	  .setPlatform("Workplace") // Nombre de la Plataforma del Chat
	  .setVersion('2.0'); // La versión que el bot desplegado es

	// Mensaje del Usuario
	if (action == "nothandled") {
	messageSet.newMessage() // Crea una nueva instancia de Mensaje
	  .setAsTypeUser() // Marca como mensaje que viene del Usuario
	  .setUserId(req.body.originalRequest.data.sender.id) // ID de usuario en la plataforma de chat  //falta definir con ID usuario de workplace 
	  .setTimestamp(Date.now().toString()) // Tiempo obtenido del sistema
	  .setIntent(req.body.queryResult.intent.displayName) // La intención decodificada a partir del mensaje del usuario
	  .setMessage(req.body.queryResult.queryText) // Mensaje de Usuario
	  .setAsNotHandled(); // Indica a Chatbase que marque esta solicitud de usuario como "no gestionada"(not handled)
	} else {
	  messageSet.newMessage() // Crea una nueva instancia de Mensaje
	  .setAsTypeUser() // Marca como mensaje que viene del Usuario
	  .setUserId(req.body.originalRequest.data.sender.id) // ID de usuario en la plataforma de chat   //falta definir con ID usuario de workplace
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
	  .setApiKey("f8be6699-d8b4-44d8-90cb-07d8d2e98cf2") // Chatbase API key
	  .setPlatform("Workplace") // Nombre de la Plataforma del Chat
	  .setVersion('2.0'); // La versión que el bot desplegado es
	
	// Mensaje del Bot
	const botMessage = messageSet2.newMessage() // Crea una nueva instancia de Mensaje
	  .setAsTypeAgent() // Marca como mensaje que viene del Bot
	  .setUserId(req.body.originalRequest.data.sender.id) // ID de usuario la misma que arriba  //falta definir con ID usuario de workplace
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
	    // Si la respuesta es una cadena, envíela como respuesta al usuario
	    if (typeof responseToUser === 'string') {
	      let responseJson = {};
	      responseJson.speech = responseToUser; // respuesta hablada
	      responseJson.displayText = responseToUser; // respuesta mostrada
	      res.json(responseJson); // Enviar respuesta a Dialogflow
	    } else {
	      // Si la respuesta al usuario incluye respuestas ricas o contextos, envíelos a Dialogflow
	      let responseJson = {};
	      // Si speech o displayText está definido, úselo para responder (si uno no está definido use el valor del otro)
	      responseJson.speech = responseToUser.speech || responseToUser.displayText;
	      responseJson.displayText = responseToUser.displayText || responseToUser.speech;
	      // Opcional: agregue mensajes enriquecidos para integraciones (https://dialogflow.com/docs/rich-messages)
	      responseJson.data = responseToUser.data;
	      // Opcional: agregar contextos (https://dialogflow.com/docs/contexts)
	      responseJson.contextOut = responseToUser.outputContexts;
	      console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
	      res.json(responseJson); // Enviar respuesta a Dialogflow
	    }
	  }
	
    };
	


	

