'use estrict'

const Colaboradores = require("./models/Colaboradores");
const Historial = require("./models/Historial");
const Agencias = require("./models/Agencias");
const Administradores = require("./models/Administradores");
const Gerentes = require("./models/Gerentes");
const Reclamos = require("./models/Reclamos");
const Agradecimiento = require("./models/Agradecimiento");
const SalidaCajeros = require("./models/SalidaCajeros");
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(process.env.PORT || 8080);
var nodemailer = require('nodemailer');
var request = require('request');
var graph = require('fbgraph');
var fs = require('fs');

// db instance connection
require("./config/db");

//Creación del metodo que escucha las llamadas POST y obtiene los parametros

app.post("/webhook",(req, res) =>{   
  const action = req.body.queryResult.action;
  const chatbase = require('@google/chatbase');
  const chatbase2= require('@google/chatbase');
  let session = (req.body.session);
  var respuesta = req.body.queryResult;
  var respuestaBot = req.body.queryResult.fulfillmentText;
  const sessionId= session.substr(-36,36)
  var access_token = 'DQVJ2eHdaZAjV5a1dOdGVLNjN1TG9xeEZAhZAlRQOGRvN3dzRXd6SHFCTXN5X3J5T29fazVxNXFJOFFOel9QenhaYVVOM2g0ZADM2MnBlSGdzZAG1Ra2g5eXo5NGJ5a2FraE45Um5mZAmpuMXR6LU4zVV81ZAkRPbndsb1pfSDVwQXJVaWVXVUZAYcDJkNVpHTHgyQjBsMy1qZA1F0UVN6ZAjhFandzYXpnR01qQWlQa2FCZAHAzZA2h2WUtSc2lhWEphYko4S0V1TGpGbTRJb0JkQjRPU216MwZDZD';
  var id = '1';
  var contador= 0;
  //var id = req.body.queryResult.outputContexts[0].parameters.facebook_sender_id;
  var idUser = String(id);
  //console.log(req.body.queryResult.outputContexts);	
  var contextos = req.body.queryResult.outputContexts;
  var i,len = contextos.length;
  var email, nameW;
  //console.log(req.body.queryResult);
  //console.log(req.body.queryResult.parameters);
	
	graph.setAccessToken(access_token);	
	for(i=0;i<len;i++){
		const outputContexts= req.body.queryResult.outputContexts[i].name;
		const nombreContexto= outputContexts.substr(-7,7)
		if(nombreContexto =='generic'){
			id=req.body.queryResult.outputContexts[i].parameters.facebook_sender_id;
			idUser = String(id);
		}else{
			console.log('extrayendo')
		}
		//console.log(id);
	}	
	//Consulta nombre de Generalista en Mongo Atlas 
	if(action == 'query'){	
		graph.get(id+"?fields=name,first_name,last_name,email", function(err, res){
			email=res.email;
			nameW=res.name	
			//console.log(nameW);
			//console.log(email);
			var query  = Colaboradores.where({ EMAIL_EMPLEADO: email.toUpperCase() });
			query.findOne(function (err, colaboradores) {
			   if (err) {
			      res.status(500).send(err);
			    }	respuestaBot = nameW +" Tu consultor es " + colaboradores.NOMBRE_CONSULTOR //+" Tu nombre " +usuarioName
				sendResponse(respuestaBot);
				sendAnalytics(nameW);
			  });
			
		});		
	 }  else if(action == "salida"){
	 	graph.get(id+"?fields=name,email,first_name", function(err, res){
			nameW=res.name
			let contexto=res.first_name
			let respuesta ={
				//fulfillmentText : req.body.queryResult.fulfillmentText,
				fulfillmentText :"Hola " +contexto+", lamentamos la baja y nos comprometemos a conseguir el reemplazo idóneo a la brevedad posible. \nPor favor ayúdame completando la siguiente información:\n\nCédula del colaborador que sale",
				//fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
				outputContexts : [{'name': req.body.session+'/contexts/salidacajeros-paso1-followup','lifespanCount':2,'parameters':{'nombre': String(contexto)+','}}]
			} 
			sendResponse(respuesta);
			sendAnalytics(nameW);
			
		});	
	 }   else if(action == "salida_paso2"){
	 	graph.get(id+"?fields=name,email", function(err, res){
			nameW=res.name;
			email=res.email;
			let ident = String(req.body.queryResult.parameters.cedula);
			var query  = Colaboradores.where({ NUMERO_IDENTIFICACION:ident });
			query.findOne(function (err, colaboradores) {
			   if (err) {
			      res.status(500).send(err);
			   }else if(colaboradores==null){
				respuestaBot = "Lo sentimos, no es posible procesar tu pedido; posiblemente la persona reportada no es Ejecutivo de Servicios Transaccionales o tú no estás registrado como su línea de supervisión. Por favor toma contacto con tu generalista "
				sendResponse(respuestaBot);
				sendAnalytics(nameW);
			   }else if(colaboradores.PUESTO =='EJECUTIVO SERVICIOS TRANSACCIONALES' || colaboradores.PUESTO =='EJECUTIVO SERVICIOS TRANSACCIONALES SR' || colaboradores.PUESTO =='ESPECIALISTA INTELIGENCIA DE NEGOCIOS'){	
				sendEmail(email);
				respuestaBot = "Lamentamos la Baja de " + colaboradores.NOMBRE+ "\n Ahora, por favor imprime y llena los siguiente documentos, FORMATOS_DOCUMENTOS_DE_SALIDA_BANCO.docx"
				let respuesta = {
					fulfillmentText : req.body.queryResult.fulfillmentText,
					fulfillmentMessages: [
						      {
							"text": {
							  "text": [
							    "Lamentamos la Baja de " + colaboradores.NOMBRE+ "\nAhora, por favor imprime y llena los siguientes documentos que también fueron enviados a tu correo,"
							  ]
							},
							"platform": "FACEBOOK",
							"lang": "es"
						      },
						      {
							"payload": {
							  "facebook": {
							    "attachment": {
							      "type": "file",
							      "payload": {
								"url": "https://storage.googleapis.com/documentos_pibot/Demo/DOCUMENTOS_DE_SALIDA.pdf"
							      }
							    }
							  }
							},
							"platform": "FACEBOOK",
							"lang": "es"
						      },
						      {
							"quickReplies": {
							  "title": "Luego continua por aquí con este proceso:",
							  "quickReplies": [
							    "Continuar"
							  ]
							},
							"platform": "FACEBOOK",
							"lang": "es"
						      },
						      {
							"text": {
							  "text": [
							    "Ahora, por favor imprime y llena los siguiente documentos, luego continua por aquí con este proceso:\n<Compartir documentos>"
							  ]
							},
							"lang": "es"
						      }
						    ],
					outputContexts : [{'name': req.body.session+'/contexts/salidacajeros-paso2-followup','lifespanCount':5,'parameters':{'NombreCajero': colaboradores.NOMBRE}}]
				}
				sendResponse(respuesta);
				sendAnalytics(nameW);
			    }else{
			    	respuestaBot = "Lo sentimos, no es posible procesar tu pedido; posiblemente la persona reportada no es Ejecutivo de Servicios Transaccionales o tú no estás registrado como su línea de supervisión. Por favor toma contacto con tu generalista "
				sendResponse(respuestaBot);
				sendAnalytics(nameW);
			    }
			  });
			
		});	
	 } else if(action == "salida_paso6"){
	 	graph.get(id+"?fields=name,email", function(err, res){
			nameW=res.name;
			email=res.email;
			let respuesta ={
				fulfillmentText : req.body.queryResult.fulfillmentText,
				fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
				outputContexts : [{'name': req.body.session+'/contexts/SalidaCajeros-Paso5-followup','lifespanCount':3,'parameters':{AdjCartaRenuncia : req.body.originalDetectIntentRequest.payload.data.message.attachments[0].payload.url}}]
			} 
			sendResponse(respuesta);
			sendAnalytics(nameW);
			//sendAnalytics(nameW);
			
		});	
	 } else if(action == "salida_paso_final"){
	 	graph.get(id+"?fields=name,email", function(err, res){
			console.log(req.body.originalDetectIntentRequest.payload.data.message.attachments)
			nameW=res.name;
			email=res.email;
			sendResponse(respuestaBot);
			sendSalidaCajero(nameW, email);
			//sendAnalytics(nameW);
			
		});	
	 } else if(action == "agencias"){
	 	graph.get(id+"?fields=name,email", function(err, res){
			nameW=res.name	
			var query  = Agencias.where({ NOMBRE: req.body.queryResult.parameters.NombreAgencia });
			query.findOne(function (err, agencias) {
			    if (err) {
			      res.status(500).send(err);
			    }	respuestaBot = "La Agencia " + agencias.NOMBRE + " cc: "+agencias.CC + " se encuentra en: \n" + agencias.PROVINCIA + "- " + agencias.CIUDAD + ", " + agencias.DIRECCION + "\nReferencia: " + agencias.REFERENCIA + "\nTeléfonos: " + agencias.TELF_1 + " /" + agencias.TELF_2 + "\nHorarios \n Semana: " + agencias.H_SEMANA + "\n Sábado: " + agencias.H_SABADO + "\n Domingo: " + agencias.H_DOMINGO
				sendResponse(respuestaBot);
				sendAnalytics(nameW);
			  });
			
		});	
	 } else if(action == "administradores"){
		//console.log(req.body.queryResult.parameters.AdministradorNombreAgencia.NombreAgencia)
	 	graph.get(id+"?fields=name,email", function(err, res){
			nameW=res.name	
			var query  = Administradores.where({ NOMBRE: req.body.queryResult.parameters.AdministradorNombreAgencia.NombreAgencia});
			query.findOne(function (err, administradores) {
			    respuestaBot="Agencia "+ administradores.NOMBRE+":";
			    if (err) {
			      res.status(500).send(err);
			    }if(administradores.ADMINISTRADOR_COMERCIAL !="nan"){
			    	respuestaBot =respuestaBot+"\nAdministrador Comercial: " + administradores.ADMINISTRADOR_COMERCIAL + "\nCEL: " + administradores.CEL_ADMINISTRADOR_COMERCIAL + "\nEXT: " + administradores.EXT_ADMINISTRADOR_COMERCIAL;
			    }if(administradores.ADMINISTRADOR_SERVICIOS !="nan"){
			    	respuestaBot =respuestaBot+"\nAdministrador Servicios: " + administradores.ADMINISTRADOR_SERVICIOS + "\nCEL: " + administradores.CEL_ADMINISTRADOR_SERVICIOS + "\nEXT: " + administradores.EXT_ADMINISTRADOR_SERVICIOS;
			    }if(administradores.ADMINISTRADOR_COMERCIAL_SERVICIOS !="nan"){
			    	respuestaBot =respuestaBot+"\nAdministrador Comercial y Servicios: " + administradores.ADMINISTRADOR_COMERCIAL_SERVICIOS + "\nCEL: " + administradores.CEL_ADMINISTRADOR_COMERCIAL_SERVICIOS + "\nEXT: " + administradores.EXT_ADMINISTRADOR_COMERCIAL_SERVICIOS;
			    }if(administradores.ESPECIALISTA_COMERCIAL_SERVICIOS !="nan"){
			    	respuestaBot =respuestaBot+"\nEspecialista Comercial y Servicios: " + administradores.ESPECIALISTA_COMERCIAL_SERVICIOS + "\nCEL: " + administradores.CEL_ESPECIALISTA_COMERCIAL_SERVICIOS + "\nEXT: " + administradores.EXT_ESPECIALISTA_COMERCIAL_SERVICIOS;
			    }sendResponse(respuestaBot);
			     sendAnalytics(nameW);
			  });
			
		});	
	 } else if(action == "gerentes"){
		//console.log(req.body.queryResult.parameters.AdministradorNombreAgencia.NombreAgencia)
	 	graph.get(id+"?fields=name,email", function(err, res){
			nameW=res.name	
			var query  = Gerentes.where({ NOMBRE: req.body.queryResult.parameters.GerenteNombreAgencia.NombreAgencia});
			query.findOne(function (err, gerentes) {
			    respuestaBot="Agencia "+ gerentes.NOMBRE+":";
			    if (err) {
			      res.status(500).send(err);
			    }if(gerentes.GERENTE_AGENCIA !="nan"){
			    	respuestaBot =respuestaBot+"\nGerente Agencia: " + gerentes.GERENTE_AGENCIA + "\nCEL: " + gerentes.CEL_GERENTE_AGENCIA + "\nEXT: " + gerentes.EXT_GERENTE_AGENCIA;
			    }	sendResponse(respuestaBot);
			    	console.log(respuestaBot)
				//sendAnalytics(nameW);
			  });
			
		});	
	 } else if(action == "reclamos"){
	 	graph.get(id+"?fields=name,email", function(err, res){
			nameW=res.name
			console.log(req.body.queryResult.parameters.ReclamosTipos);
			var query  = Reclamos.where({ TIPO: req.body.queryResult.parameters.ReclamosTipos });
			query.findOne(function (err, reclamos) {
			    if (err) {
			      res.status(500).send(err);
			    }	respuestaBot = reclamos.AYUDA +"\n\nPara más información ingresa en el siguiente link: http://bit.ly/2IRBCzG "
				sendResponse(respuestaBot);
				sendAnalytics(nameW);
			  });
			
		});	
	 } else if(action == "agradecer"){
	 	graph.get(id+"?fields=name,first_name,last_name,email", function(err, res){
			email=res.email;
			nameW=res.name	
			sendResponse(respuesta); 
			sendAgradecer(nameW);
		});
	 } 
	/*else if (action == "nothandled") {
		graph.get(id+"?fields=name,first_name,last_name,email", function(err, res){
			email=res.email;
			nameW=res.name	
			let transporter = nodemailer.createTransport({
			    service: 'Gmail',
			    auth: {
			      type: 'OAuth2',
			      user: 'edujvr.k15@gmail.com',
			      clientId: '302919125596-e1roihqdf4gkuf8rrhd708uih3o2efen.apps.googleusercontent.com',
			      clientSecret: '5JrKDFXzjA8fl57pgcLZgwUH',
			      refreshToken: '1/HF8MdT3XzwEBLrBG8nFLAiWm-Uz0QVgkEhfH1DQbwVgDVpXZbxOL0OEfOcmzip7Z'
			    }
			  })

			  let mailOptions = {
			    from: '<edujvr.k15@gmail.com>',
			    to: 'etandazo@pichincha.com',
			    subject: 'Chatbot consulta no contestada',
			    html: 'El usuario '+nameW+' con email '+email+ '<br>'+ ' pregunto: '+ req.body.queryResult.queryText +  '<br><br>'+' Saludos ' +  '<br>'+' Tu asistente Virtual '
			  }

			  transporter.sendMail(mailOptions, (err, info) => {
			    if (err) throw new Error(err)

			    res.statusCode = 200
			    res.end('Email sent!')
			  })
		sendResponse(respuesta); 
		sendAnalytics(nameW);
		});	
	 } */else if (action == "correo") {
		graph.get(id+"?fields=name,first_name,last_name,email", function(err, res){
			email=res.email;
			nameW=res.name	
			let transporter = nodemailer.createTransport({
			    service: 'Gmail',
			    auth: {
			      type: 'OAuth2',
			      user: 'edujvr.k15@gmail.com',
			      clientId: '302919125596-e1roihqdf4gkuf8rrhd708uih3o2efen.apps.googleusercontent.com',
			      clientSecret: '5JrKDFXzjA8fl57pgcLZgwUH',
			      refreshToken: '1/HF8MdT3XzwEBLrBG8nFLAiWm-Uz0QVgkEhfH1DQbwVgDVpXZbxOL0OEfOcmzip7Z'
			    }
			  })

			  let mailOptions = {
			    from: '<edujvr.k15@gmail.com>',
			    to: email,
			    subject: 'Proceso Salida Documento ',
			    html: 'Por favor imprime y llena el siguiente documento',
			    attachments: [
			       {
				path: 'https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/67406472_342909533278303_3831993194703224832_n.jpg?_nc_cat=102&_nc_oc=AQmZoo0GLnJDvv6rGtfTdd0h3YPpcSCym9jXyVWnyXt-7SZdTy4XHAFm0qWc8M9szihnUl7ShaNzUBugC0CjuClH&_nc_ad=z-m&_nc_cid=0&_nc_zor=9&_nc_ht=scontent-atl3-1.xx&oh=89c2b8018956b78540ea66ca06feeb2a&oe=5DE3CF9B'
			       }
			    ]
			  }

			  transporter.sendMail(mailOptions, (err, info) => {
			    if (err) throw new Error(err)

			    res.statusCode = 200
			    res.end('Email sent!')
			  })
		sendResponse(respuesta); 
		sendAnalytics(nameW);
		});	
	 } else { //Envio de información directa webhook a Dialogflow	
		graph.get(id+"?fields=name,first_name,last_name,email", function(err, res){
			email=res.email;
			nameW=res.name	
			sendResponse(respuesta); 
			sendAnalytics(nameW);
		});
	 }
	
	function sendEmail(email){
		let transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				type: 'OAuth2',
				user: 'edujvr.k15@gmail.com',
				clientId: '302919125596-e1roihqdf4gkuf8rrhd708uih3o2efen.apps.googleusercontent.com',
				clientSecret: '5JrKDFXzjA8fl57pgcLZgwUH',
				refreshToken: '1/HF8MdT3XzwEBLrBG8nFLAiWm-Uz0QVgkEhfH1DQbwVgDVpXZbxOL0OEfOcmzip7Z'
			    }
		})
		let mailOptions = {
			from: '<edujvr.k15@gmail.com>',
			to: email,
			subject: 'Proceso Salida Documento ',
			html: 'Por favor imprime y llena el siguiente documento',
			attachments: [
				{
					path: 'https://storage.googleapis.com/documentos_pibot/Demo/DOCUMENTOS_DE_SALIDA.pdf'
				}
			    ]
		}
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) throw new Error(err)
			    res.statusCode = 200
			    res.end('Email sent!')
		})
	}
	
	function sendSalidaCajero (nameUser, email){
		var cajero = new Object();
		cajero.SesionId = sessionId;
		cajero.IdLS = id;
		cajero.NombreLS = nameUser;
		cajero.CorreoLS = email;
		cajero.IdCajero = String(req.body.queryResult.outputContexts[0].parameters.cedula);
		cajero.NombreCajero = req.body.queryResult.outputContexts[2].parameters.NombreCajero;
		cajero.MotivoSalida = req.body.queryResult.outputContexts[0].parameters.MotivoSalida;
		cajero.FechaSalida = req.body.queryResult.outputContexts[0].parameters.date;
		cajero.AdjCartaRenuncia = req.body.queryResult.outputContexts[1].parameters.AdjCartaRenuncia;
		cajero.AdjFormularioSalida = req.body.originalDetectIntentRequest.payload.data.message.attachments[0].payload.url;
		console.log(cajero)
		let newAgradecimiento = new SalidaCajeros(cajero);
		newAgradecimiento.save(function (err) {
			if (err) return handleError(err);
		});		
	}
	
	function sendAgradecer (nameUser){
		console.log(req.body.originalDetectIntentRequest.payload.data.message.attachments)
		var agradecer = new Object();
		agradecer.SesionId = sessionId;
		agradecer.UsuarioId = id;
		agradecer.UsuarioGenerador = nameUser;
		agradecer.UsuarioReceptor= req.body.queryResult.outputContexts[0].parameters.UsuariosRed;
		agradecer.Comportamiento = req.body.queryResult.outputContexts[0].parameters.Comportamiento;
		agradecer.Descripcion= req.body.queryResult.outputContexts[0].parameters.Descripcion;
		if(req.body.originalDetectIntentRequest.payload.data.message.attachments!= null){
			agradecer.Adjunto = req.body.originalDetectIntentRequest.payload.data.message.attachments[0].payload.url;
		   }
		console.log(agradecer)
		/*let newAgradecimiento = new Agradecimiento(agradecer);
		newAgradecimiento.save(function (err) {
			if (err) return handleError(err);
		});*/
	}
		
	function sendAnalytics (nameUser) {
	//console.log(req.body.queryResult.fulfillmentMessages);
	//Creción del Objeto Json para almacenar en Mongo Atlas
		if(action == "encuesta") {
			respuestaBot=String(req.body.queryResult.fulfillmentMessages[2].text.text[0])
			var historial = new Object();
			historial.SesionId = sessionId;
			historial.UsuarioId = id;
			historial.NombreUsuario= nameUser;
			historial.UsuarioDice = req.body.queryResult.queryText;
			historial.NombreIntento= req.body.queryResult.intent.displayName;
			historial.BotResponde= respuestaBot;
		} else {
			var historial = new Object();
			historial.SesionId = sessionId;
			historial.UsuarioId = id;
			historial.NombreUsuario= nameUser;
			historial.UsuarioDice = req.body.queryResult.queryText;
			historial.NombreIntento= req.body.queryResult.intent.displayName;
			historial.BotResponde= respuestaBot;
		}
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
	  .setMessage(respuestaBot); // Mensaje de respuesta del Bot
	
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
		//console.log(responseToUser)
	    // if the response is a string send it as a response to the user
	    if (typeof responseToUser === 'string') {
	      let responseJson = {fulfillmentText: responseToUser}; // displayed response
	      //console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
	      res.json(responseJson); // Send response to Dialogflow
	    } else {
	      //console.log(responseToUser.outputContexts)
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
	     // console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
	      res.json(responseJson);
	    }
	  }
	
    });
