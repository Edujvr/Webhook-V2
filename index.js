'use estrict'

const Colaboradores = require("./models/Colaboradores");
const Objetivos = require("./models/Objetivos");
const Microfinanzas = require("./models/Microfinanzas");
const Generalistas = require("./models/Generalistas");
const Historial = require("./models/Historial");
const Agencias = require("./models/Agencias");
const Administradores = require("./models/Administradores");
const Gerentes = require("./models/Gerentes");
const Reclamos = require("./models/Reclamos");
const Agradecimiento = require("./models/Agradecimiento");
const SalidaCajeros = require("./models/SalidaCajeros");
const {modGeneralista} = require("./functions/modelMongo");
const {modProductosCROF} = require("./functions/modelProductosCROF");
const {modMicro1} = require("./functions/modelMicro1");
const {modMicro2} = require("./functions/modelMicro2");
const {modMicro3} = require("./functions/modelMicro3");
const {modMicro4} = require("./functions/modelMicro4");
const {modMicro4b} = require("./functions/modelMicro4b");
const {modMicro5} = require("./functions/modelMicro5");
const {graphID} = require("./functions/graphFB");
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
app.post("/webhook",async(req, res) =>{   
  const action = req.body.queryResult.action;
  const chatbase = require('@google/chatbase');
  const chatbase2= require('@google/chatbase');
  let session = (req.body.session);
  var respuesta = req.body.queryResult;
  var respuestaBot = req.body.queryResult.fulfillmentText;
  const sessionId= session.substr(-36,36)
  var access_token = 'DQVJ1c0hlREl1YlQ5ZA1RocmZAzZAXZAQOVc5LVFjdDFIeTZAlY2ZAia1E4VFFWcXo1ajM3RnpfQmNoYm9vajljdDlZAei16ZAGpMVHd1eHNkaVhkVkdzZAGVBbDJhM3JWa3YyMVRRVTdlRnVUUkdrTkNJVjhXaDNhM1l5T0xuQ2VwMTJMam1FbU85YlBKSm5CQjhQdG1uOW5ZAVV8yWnUtVVU4R3ljSkFVelp4V3B3ZAlMtUXk2NXVLWERaQ2x6Y0Ffd0xXQURhZATd4azdRYkFoNlk3QVN5agZDZD';
  //var access_token = 'DQVJ2NUhWeU1kOW5YT0xEQUFYdkkyR3pUUVgydFhieFUxaXpoa3ZAvbERaOXYxNHcxa2Rmbm5tWmRjMm1veVhRWC1Db1hablN2ek1mMlI4dXhzNlJ6ZATZAyV3p4bllMcDZAXM3BkUW02VmhxbEVGV2tmSnhoQ2o5YmdlSUZAjdW9sM0xkMS10NllHZAzdfWExidGJDUnhjMEN6UFVLSjU1ZA29uNnlsbGduRjYzS3RFZAzFxYkhLUDFKRWJQTWRvWndGNmtteUZA4eUpsNEp1RWdSckZAPMQZDZD';
  var id = '1';
  var contador= 0;
  //var id = req.body.queryResult.outputContexts[0].parameters.facebook_sender_id;
  var idUser = String(id);	
  var contextos = req.body.queryResult.outputContexts;
  var i,len = contextos.length;
  var email, nameW;
  var aux;
  //console.log(JSON.stringify(req));
  //console.log(req.body.originalDetectIntentRequest.payload.data);
  //console.log(req.body.originalDetectIntentRequest.payload.data.recipient);
  //console.log(req.body.originalDetectIntentRequest.payload.data.sender);
  //console.log(req.body.originalDetectIntentRequest.payload.data.message);
	
  //console.log(req.body.queryResult.outputContexts)
	
	graph.setAccessToken(access_token);
	//console.log("es"+Object.entries(req.body.originalDetectIntentRequest).length)
	if(Object.entries(req.body.originalDetectIntentRequest.payload).length === 0){
		id=1;
	}else{
		id=req.body.originalDetectIntentRequest.payload.data.sender.id;
		//console.log(id)
		idUser = String(id);
	}
		
	//Consulta nombre de Generalista en Mongo Atlas 
	if(action == 'query'){
		if(id==1){
			var usrPortal=req.body.originalDetectIntentRequest.payload.user;
			email=usrPortal+'@pichincha.com';	
		}else{
			const data = await graphID(id);
			email=data.email;
		}
		nameW = await getUserMiPortal(email);
		var query  = Colaboradores.where({ EMAIL_EMPLEADO: email });
		query.findOne(function (err, colaboradores) {
			if (err) {
				res.status(500).send(err);
			}else if(colaboradores == undefined || colaboradores == '' || colaboradores == []){
				sendResponse(respuestaBot);//Envio de respuesta al Colaborador
				sendAnalytics(nameW);
			}else{
				var query1 = Generalistas.where({ID: colaboradores.NOMBRE_CONSULTOR});
				query1.findOne(async function (err, generalistas) {
					if (err) {
						res.status(500).send(err);
					}else{
						const parte1 = nameW + " su Generalista es " + generalistas.NOMBRE_GENERALISTA +"\n"+ generalistas.EXT + "\n" + generalistas.CEL + "\n" + generalistas.UBICACION;
						const parte2 = "Principales Funciones\n• Asesorar en aspectos laborales (Reglamento Interno)\n• Intervención en manejo de conflictos\n• Gestión de Clima laboral (Medición, planes de acción, seguimiento)\n• Asesorar sobre beneficios (Vacaciones, maternidad, permisos, etc.)\n• Gestionar requerimientos con áreas de especialidad en RRHH\n• Asesorar en procesos de selección, capacitación, desarrollo\n\nImportante: Si tu generalista no contesta su celular o extensión puedes escribirle un mensaje de WhatsApp o texto"; 
						const respuesta = await modGeneralista(parte1 , parte2);
						respuestaBot = parte1 + parte2;
						sendResponse(respuesta);
						sendAnalytics(nameW);	
					}
				});
			}
		});
	}else if(action == "prueba"){
		//console.log("Entro en la validación")
		//console.log(req.body.originalDetectIntentRequest.payload.data.sende.id)
		console.log(id)
		 const data = await graphID(id);
		 console.log(data)
		 sendResponse(respuestaBot);
		 sendAnalytics(data.name);
	}else if(action == "CobranzaValidacion"){
		const data = await graphID(id);
		nameW= data.name;
		email=data.email;
		var query = Microfinanzas.where({EMAIL:email});
		query.findOne(async function (err, microfinanzas){
			if (err) {
				res.status(500).send(err);
			}else{
				if(microfinanzas==null || microfinanzas == undefined || microfinanzas == '' || microfinanzas == []){
					sendResponse(respuesta);
					sendAnalytics(nameW);
				}else{
					const num = await numCliente(microfinanzas)
					const cliente = microfinanzas.CLIENTES[num];
					if(num === 100){
						respuesta =nameW+" completaste con éxito el piloto de Estrategias de cobranza. Gracias por participar, tus espuestas nos ayudarán muchísimo"
						sendResponse(respuesta);
						sendAnalytics(nameW);
					}else if(num === 0){
						const respuesta = await modMicro1();
						sendResponse(respuesta);
						sendAnalytics(nameW);
					}else{					
						Microfinanzas.update( {"_id":microfinanzas._id,"CLIENTES.NombreCliente":microfinanzas.CLIENTES[num].NombreCliente } ,{$set: {"CLIENTES.$.HoraInicio": EcuTime}} ,async function (err, microfinanzas){
						const respuesta = await modMicro2(nameW,cliente);
						sendResponse(respuesta);
						sendAnalytics(nameW);
						});
					}
				}
			}
		});
	}else if(action == "CobranzaClientes"){
		const data = await graphID(id);
		nameW= data.name;
		email=data.email;
		var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/Guayaquil"});
		var EcuTime = (new Date(usaTime)).toISOString();
		var query = Microfinanzas.where({EMAIL:email});
		query.findOne(async function (err, microfinanzas){
			if (err) {
				res.status(500).send(err);
			}else{
				const num = await numCliente(microfinanzas)
				if(microfinanzas==null || microfinanzas == undefined || microfinanzas == '' || microfinanzas == []){
					sendResponse(respuesta);
					sendAnalytics(nameW);
				}else{
					const cliente = microfinanzas.CLIENTES[num];
					Microfinanzas.update( {"_id":microfinanzas._id,"CLIENTES.NombreCliente":microfinanzas.CLIENTES[num].NombreCliente } ,{$set: {"CLIENTES.$.HoraInicio": EcuTime}} ,async function (err, microfinanzas){
						const respuesta = await modMicro2(nameW,cliente);
						sendResponse(respuesta);
						sendAnalytics(nameW);
					});
				}
			}
		});	
	}else if(action == "MicrofinanzasInfoAdNO/SI"){
		const data = await graphID(id);
		nameW= data.name;
		email=data.email;
		var input = req.body.queryResult.queryText;
		var query = Microfinanzas.where({EMAIL:email});
		query.findOne(async function (err, microfinanzas){
			if (err) {
				res.status(500).send(err);
			}else{
				const num = await numCliente(microfinanzas)
				//console.log(num)
				if(req.body.queryResult.intent.displayName === "Microfinanzas - INPUT INFORMACION ADICIONAL"){
					Microfinanzas.update( {"_id":microfinanzas._id,"CLIENTES.NombreCliente":microfinanzas.CLIENTES[num].NombreCliente } ,{$set: {"CLIENTES.$.OtraInformacion": input}} ,async function (err, microfinanzas){
						respuesta = await modMicro4b();
						sendResponse(respuesta);
						sendAnalytics(nameW);
					});	
				}else{
					respuesta = await modMicro4();
					sendResponse(respuesta);
					sendAnalytics(nameW);
				}
			}
		});
	}else if(action == "MicrofinanzasValidarPrimerCliente"){
		const data = await graphID(id);
		nameW= data.name;
		email=data.email;
		var query = Microfinanzas.where({EMAIL:email});
		query.findOne(async function (err, microfinanzas){
			if (err) {
				res.status(500).send(err);
			}else{
				const num = await numCliente(microfinanzas)
				//console.log(num)
				//if(num === 0){
					//respuesta = await modMicro3();
					//sendResponse(respuesta);
					//sendAnalytics(nameW);
				//}else{
					respuesta = await modMicro4();
					sendResponse(respuesta);
					sendAnalytics(nameW);
				//}
			}
		});
	}else if(action == "MicrofinanzasFinal"){
		const data = await graphID(id);
		nameW= data.name;
		email=data.email;
		var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/Guayaquil"});
		var EcuTime = (new Date(usaTime)).toISOString()
		var query = Microfinanzas.where({EMAIL:email});
		query.findOne(async function (err, microfinanzas){
			if (err) {
				res.status(500).send(err);
			}else{
				var input = req.body.queryResult.queryText;
				const num = await numCliente(microfinanzas)
				if(microfinanzas.CLIENTES[num].HoraInicio==""){
					respuesta='Recuerda que para retomar con los clientes faltantes debes escribir "cobranzas"'
				   	sendResponse(respuesta);
					sendAnalytics(nameW);
				}else if((num+1) === microfinanzas.CLIENTES.length){
					respuesta = await modMicro3();
					Microfinanzas.update( {"_id":microfinanzas._id,"CLIENTES.NombreCliente":microfinanzas.CLIENTES[num].NombreCliente } ,{$set: {"CLIENTES.$.PorqueEstrategia": input}} ,async function (err, microfinanzas){
						sendResponse(respuesta);
						sendAnalytics(nameW);
					});
				}else if(num === 100){
					respuesta =nameW+" completaste con éxito el piloto de Estrategias de cobranza. Gracias por participar, tus espuestas nos ayudarán muchísimo"
					sendResponse(respuesta);
					sendAnalytics(nameW);
				}else{
					const frase = microfinanzas.CLIENTES[num].FraseMotivadora
					const fraseF=frase.replace('{usr_name}', nameW);
					console.log(fraseF)
					Microfinanzas.update( {"_id":microfinanzas._id,"CLIENTES.NombreCliente":microfinanzas.CLIENTES[num].NombreCliente } ,{$set: {"CLIENTES.$.Confirmacion": "SI" ,"CLIENTES.$.HoraFin": EcuTime,"CLIENTES.$.PorqueEstrategia": input}} ,async function (err, microfinanzas){
						respuesta = await modMicro5(fraseF);
						sendResponse(respuesta);
						sendAnalytics(nameW);
					});
				}
			}
		});
	}else if(action == "MicrofinanzasBucle"){
		const data = await graphID(id);
		nameW= data.name;
		email=data.email;
		var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/Guayaquil"});
		var EcuTime = (new Date(usaTime)).toISOString()
		var query = Microfinanzas.where({EMAIL:email});
		query.findOne(async function (err, microfinanzas){
			if (err) {
				res.status(500).send(err);
			}else{
				const num = await numCliente(microfinanzas)
				if(microfinanzas==null || microfinanzas == undefined || microfinanzas == '' || microfinanzas == []){
					sendResponse(respuesta);
					sendAnalytics(nameW);
				}else{
					const cliente = microfinanzas.CLIENTES[num];
					Microfinanzas.update( {"_id":microfinanzas._id,"CLIENTES.NombreCliente":microfinanzas.CLIENTES[num].NombreCliente } ,{$set: {"CLIENTES.$.HoraInicio": EcuTime}} ,async function (err, microfinanzas){
						const respuesta = await modMicro2(nameW,cliente);
						sendResponse(respuesta);
						sendAnalytics(nameW);
					});
				}
			}
		});
	}else if(action == "MicroEstrategiaSave"){
		const data = await graphID(id);
		nameW= data.name;
		email=data.email;
		var input = req.body.queryResult.queryText;
		var query = Microfinanzas.where({EMAIL:email});
		query.findOne(async function (err, microfinanzas){
			const num = await numCliente(microfinanzas)
			Microfinanzas.update( {"_id":microfinanzas._id,"CLIENTES.NombreCliente":microfinanzas.CLIENTES[num].NombreCliente } ,{$set: {"CLIENTES.$.EstrategiaCobranza": input}} ,async function (err, microfinanzas){
				sendResponse(respuesta);
				sendAnalytics(nameW);
			});
		});
	}else if(action == "MicroOtraEstrategiaSave"){
		const data = await graphID(id);
		nameW= data.name;
		email=data.email;
		var input = req.body.queryResult.queryText;
		var query = Microfinanzas.where({EMAIL:email});
		query.findOne(async function (err, microfinanzas){
			const num = await numCliente(microfinanzas)
			Microfinanzas.update( {"_id":microfinanzas._id,"CLIENTES.NombreCliente":microfinanzas.CLIENTES[num].NombreCliente } ,{$set: {"CLIENTES.$.OtraEstrategiaCobranza": input}} ,async function (err, microfinanzas){
				sendResponse(respuesta);
				sendAnalytics(nameW);
			});
		});
	}else if(action == "MicroFraseFinal"){
		const data = await graphID(id);
		nameW= data.name;
		email=data.email;
		var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/Guayaquil"});
		var EcuTime = (new Date(usaTime)).toISOString()
		respuesta =nameW+" completaste con éxito el piloto de Estrategias de cobranza. Gracias por participar, tus espuestas nos ayudarán muchísimo"
		var input;
		if(req.body.queryResult.queryText=="NO"){
			input="";
		}else{
			input=req.body.queryResult.queryText
		}
		var query = Microfinanzas.where({EMAIL:email});
		query.findOne(async function (err, microfinanzas){
			const num = await numCliente(microfinanzas)
			if (err) {
				res.status(500).send(err);
			}else if((num+1) === microfinanzas.CLIENTES.length){	
				Microfinanzas.update( {"_id":microfinanzas._id,"CLIENTES.NombreCliente":microfinanzas.CLIENTES[num].NombreCliente } ,{$set: {"CLIENTES.$.Confirmacion": "SI" ,"CLIENTES.$.HoraFin": EcuTime,"CLIENTES.$.OtraInformacion": input}} ,async function (err, microfinanzas){
					sendResponse(respuesta);
					sendAnalytics(nameW);	
				});
			}else{
			   	respuesta='Recuerda que para retomar con los clientes faltantes debes escribir "cobranzas"'				
				sendResponse(respuesta);
				sendAnalytics(nameW);
			}	
			
		});
	}else if(action == "MicrofinanzasParche"){
		const data = await graphID(id);
		nameW= data.name;
		email=data.email;
		var query = Microfinanzas.where({EMAIL:email});
		query.findOne(async function (err, microfinanzas){
			const num = await numCliente(microfinanzas)
			if (err) {
				res.status(500).send(err);
			}else if((num+1) === microfinanzas.CLIENTES.length){
				sendResponse(respuesta);
				sendAnalytics(nameW);
			}else{
			   	respuesta='Recuerda que para retomar con los clientes faltantes debes escribir "cobranzas"'				
				sendResponse(respuesta);
				sendAnalytics(nameW);
			}
			
		});
	}else if(action == "productosCROF"){
			const data = await graphID(id);
			const respuesta = await modProductosCROF();
			sendResponse(respuesta);
			sendAnalytics(data.name);
	}else if(action == "objetivos"){
		if(id==1){
			var usrPortal=req.body.originalDetectIntentRequest.payload.user;
			email=usrPortal+'@pichincha.com';	
		}else{
			const data = await graphID(id);
			email=data.email;
		}
		nameW = await getUserMiPortal(email);
		console.log(email);
		var query  = Objetivos.where({ MAIL: email });
		query.findOne(function (err, objetivos) {
			if (err) {
				res.status(500).send(err);
			}else if(objetivos == undefined || objetivos == '' || objetivos == []){
				sendResponse(respuestaBot);
				sendAnalytics(nameW);
			}else{
				respuestaBot = nameW +" Tu calificación fue: " 
				for(var i=0; i < objetivos.INDICADORES.length; i++){
					respuestaBot= respuestaBot + "\n"
					respuestaBot= respuestaBot + objetivos.INDICADORES[i]
				}respuestaBot= respuestaBot + "\n\nCualquier inquietud consulta a tu línea de supervisión \nMás detalle de tus resultados Clic Aquí 👇👇 https://pichinchanetbp.bpichincha.com/divisiones/reddeagencias/resultados/indicadores-de-gesti%C3%B3n"
				sendResponse(respuestaBot);
				sendAnalytics(nameW);
			}
		});
	 }else if(action == "codigo"){//Consulta el código único de colaborador
		if(id==1){
			var usrPortal=req.body.originalDetectIntentRequest.payload.user;
			email=usrPortal+'@pichincha.com';
		}else{
			const data = await graphID(id);
			email=data.email;
		}
		nameW = await getUserMiPortal(email);
		var query  = Colaboradores.where({ EMAIL_EMPLEADO: email });//Consulta en la base de datos por correo
		query.findOne(function (err, colaboradores) {
			if (err) {
				res.status(500).send(err);
			}else if(colaboradores == undefined || colaboradores == '' || colaboradores == []){
				sendResponse(respuestaBot);
				sendAnalytics(nameW);
			}else{
				respuestaBot = nameW +" tu código de empleado es " +  colaboradores.CODIGO_EMPLEADO //Extrae el código del empleado y lo adjunta en la respuesta del Chatbot
				sendResponse(respuestaBot);//Envio de respuesta al Colaborador
				sendAnalytics(nameW);//Envio de la interacción a la BD Históricos
			}
		});
	 }else if(action == "salida"){
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
				//sendEmail(email);
				respuestaBot = "Lamentamos la Baja de " + colaboradores.NOMBRE+ "\n Por favor indica la causa de salida del colaborador:\nMotivo de Salida: Renuncia voluntaria, Despido, Fallecimiento\nMotivo de Salida: Visto bueno, Fin contrato eventual, Fin periodo prueba"
				let respuesta = {
					fulfillmentText : respuestaBot,
					"fulfillmentMessages": [
						    {
						      "text": {
							"text": [
							  "Lamentamos la Baja de " + colaboradores.NOMBRE+ "\nPor favor indica la causa de salida del colaborador:"
							]
						      },
						      "platform": "FACEBOOK",
						      "lang": "es"
						    },
						    {
						      "card": {
							"title": "Motivo de Salida",
							"buttons": [
							  {
							    "text": "Renuncia voluntaria"
							  },
							  {
							    "text": "Despido"
							  },
							  {
							    "text": "Fallecimiento"
							  }
							]
						      },
						      "platform": "FACEBOOK",
						      "lang": "es"
						    },
						    {
						      "card": {
							"title": "Motivo de Salida",
							"buttons": [
							  {
							    "text": "Visto bueno"
							  },
							  {
							    "text": "Fin contrato eventual"
							  },
							  {
							    "text": "Fin periodo prueba"
							  }
							]
						      },
						      "platform": "FACEBOOK",
						      "lang": "es"
						    },
						    {
						      "text": {
							"text": [
							  "Lamentamos la Baja de " + colaboradores.NOMBRE+ "\nPor favor indica la causa de salida del colaborador:\nMotivo de Salida: Renuncia voluntaria, Despido, Fallecimiento\nMotivo de Salida: Visto bueno, Fin contrato eventual, Fin periodo prueba"
							]
						      },
						      "lang": "es"
						    }
						  ],
					outputContexts : [{'name': req.body.session+'/contexts/salidacajeros-paso2-followup','lifespanCount':6,'parameters':{'NombreCajero': colaboradores.NOMBRE}}]
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
	 } else if(action == "salida_paso3"){
		var CausaSalida = getCausa();
	 	graph.get(id+"?fields=name,email", function(err, res){
			nameW=res.name;
			email=res.email;
			if(CausaSalida == 'Renuncia voluntaria'){
				documento='https://storage.googleapis.com/documentos_pibot/Demo/DOCUMENTOS_DE_SALIDA_1.docx'
				sendEmail(email,documento);
			}else if(CausaSalida == 'Despido'){
				documento='https://storage.googleapis.com/documentos_pibot/Demo/DOCUMENTOS_DE_SALIDA_2.docx'
				sendEmail(email,documento);
			}else if(CausaSalida == 'Fallecimiento'){
				documento='https://storage.googleapis.com/documentos_pibot/Demo/DOCUMENTOS_DE_SALIDA_3.docx' 
				sendEmail(email,documento);
			}else if(CausaSalida == 'Visto bueno'){
				documento='https://storage.googleapis.com/documentos_pibot/Demo/DOCUMENTOS_DE_SALIDA_4.docx' 
				sendEmail(email,documento);
			}else if(CausaSalida == 'Fin contrato eventual'){
				documento='https://storage.googleapis.com/documentos_pibot/Demo/DOCUMENTOS_DE_SALIDA_5.docx' 
				sendEmail(email,documento);
			}else{
				documento='https://storage.googleapis.com/documentos_pibot/Demo/DOCUMENTOS_DE_SALIDA_6.docx'
				sendEmail(email,documento);
			}
			//sendEmail(email);
			respuestaBot = "Ahora, por favor imprime y llena los siguientes documentos que también fueron enviados a tu correo,"
			let respuesta = {
					fulfillmentText : req.body.queryResult.fulfillmentText,
					fulfillmentMessages: [
						      {
							"text": {
							  "text": [
							    "Ahora, por favor imprime y llena los siguientes documentos que también fueron enviados a tu correo,"
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
								"url": documento
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
					outputContexts : req.body.queryResult.outputContexts
				}
				sendResponse(respuesta);
				sendAnalytics(nameW);
			    /*}else{
			    	respuestaBot = "Lo sentimos, no es posible procesar tu pedido; posiblemente la persona reportada no es Ejecutivo de Servicios Transaccionales o tú no estás registrado como su línea de supervisión. Por favor toma contacto con tu generalista "
				sendResponse(respuestaBot);
				sendAnalytics(nameW);
			    }*/	
		});	
	 }  else if(action == "salida_paso5"){ 
		var CausaSalida = getCausa();
	 	graph.get(id+"?fields=name,email", function(err, res){
			nameW=res.name;
			email=res.email;
			var fecha = String(req.body.queryResult.parameters.date)
			var FechaSalida = new Date(fecha.substr(0,4),fecha.substr(5,2)-1,fecha.substr(8,2),0,0,0)
			var FechaActualMax = new Date()
			FechaActualMax.setDate(FechaActualMax.getDate() + 15);
			var FechaActualMin = new Date()
			FechaActualMin.setDate(FechaActualMin.getDate() - 15);
			if(FechaSalida <= FechaActualMax && FechaSalida >= FechaActualMin){
				respuestaBot='Ahora por favor toma foto a la hoja de salida que te proporcionamos arriba y cárgala en este feed.'
				respuesta=getContext(CausaSalida,respuestaBot);
			}else{
				respuesta='Lo siento la fecha ingresada no esta en el rango permitido para notificar la salida, por favor comunicarse con su generalista'  
			}
			sendResponse(respuesta);
			sendAnalytics(nameW);
		});	
	 }  else if(action == "salida_paso6"){
		var CausaSalida = getCausa(); 
	 	graph.get(id+"?fields=name,email", function(err, res){
			//console.log( req.body.originalDetectIntentRequest.payload.data.message.attachments[0].payload.url);
			nameW=res.name;
			email=res.email;
			sendResponse(respuesta);
			sendAnalytics(nameW);			
		});	
	 } else if(action == "salida_paso_final"){
	 	graph.get(id+"?fields=name,email", function(err, res){
			//console.log(req.body.originalDetectIntentRequest.payload.data.message.attachments)
			nameW=res.name;
			email=res.email;
			sendResponse(respuestaBot);
			sendSalidaCajero(nameW, email);
			//sendAnalytics(nameW);
		});	
	 }//Proceso Busqueda de agencia por nombre en la base de datos Mongo Atlas 
	else if(action == "agencias"){
		if(req.body.queryResult.parameters.NombreAgencia == undefined || req.body.queryResult.parameters.NombreAgencia == ''){
			 graph.get(id+"?fields=name,email", function(err, res){
				nameW=res.name
				sendResponse(respuestaBot);				
				sendAnalytics(nameW);
			});
		}else{
			graph.get(id+"?fields=name,email", function(err, res){
				nameW=res.name	
				var query  = Agencias.where({ NOMBRE: req.body.queryResult.parameters.NombreAgencia });
				query.findOne(function (err, agencias) {
					if (err) {
					  res.status(500).send(err);
					}else if(agencias==undefined){
						 respuestaBot= respuestaBot;
					}else{
						//respuestaBot = "La Agencia " + agencias.NOMBRE + " cc: "+ agencias.CC + " se encuentra en: \n" + agencias.PROVINCIA + "- " + agencias.CUIDAD + ", " + agencias.DIRECCION + "\nReferencia: " + agencias.REFERENCIA + "\nTeléfonos: " + agencias.TELF_1 + " /" + agencias.TELF_2 + "\nEstado Agencia Por Contigencia COVID_19: " + agencias.ESTADO +  "\nHorarios \n Lunes a Viernes: " + agencias.H_SEMANA + "\n Sábado: " + agencias.H_SABADO + "\n Domingo: " + agencias.H_DOMINGO				
						respuestaBot = "La Agencia " + agencias.NOMBRE + " cc: "+ agencias.CC + " se encuentra en: \n" + agencias.PROVINCIA + "- " + agencias.CUIDAD + ", " + agencias.DIRECCION + "\nReferencia: " + agencias.REFERENCIA + "\nTeléfonos: " + agencias.TELF_1 + " /" + agencias.TELF_2 + "\nHorarios \n Lunes a Viernes: " + agencias.H_SEMANA + "\n Sábado: " + agencias.H_SABADO + "\n Domingo: " + agencias.H_DOMINGO				
						var query1  = Gerentes.where({ NOMBRE: req.body.queryResult.parameters.NombreAgencia});				
						query1.findOne(function (err, gerentes) {
							if (err) {
								res.status(500).send(err);
							}else if(gerentes==undefined){
								sendResponse(respuestaBot);
								sendAnalytics(nameW);
							}else{
								respuestaBot=respuestaBot + "\n\nLineas de Supervisión:";
								//respuestaBot = respuestaBot+"\nGerente Agencia: " + gerentes.GERENTE_AGENCIA + "\nCEL: " + gerentes.CEL_GERENTE_AGENCIA + "\nEXT: " + gerentes.EXT_GERENTE_AGENCIA + "\nCONVENCIONAL: " + gerentes.CONV_GERENTE_AGENCIA;	
								respuestaBot = respuestaBot+"\nGerente Agencia: " + gerentes.GERENTE_AGENCIA + "\nCEL: " + gerentes.CEL_GERENTE_AGENCIA + "\nEXT: " + gerentes.EXT_GERENTE_AGENCIA 	
								var query2  = Administradores.where({ NOMBRE: req.body.queryResult.parameters.NombreAgencia});
								query2.findOne(function (err, administradores) {
									respuestaBot=respuestaBot+"\n"
									if (err) {
									  res.status(500).send(err);
									}if(administradores.ADMINISTRADOR_COMERCIAL != 'N/A'){
										respuestaBot =respuestaBot+"\nAdministrador Comercial: " + administradores.ADMINISTRADOR_COMERCIAL + "\nCEL: " + administradores.CEL_ADMINISTRADOR_COMERCIAL + "\nEXT: " + administradores.EXT_ADMINISTRADOR_COMERCIAL;
									}if(administradores.ADMINISTRADOR_SERVICIOS != 'N/A'){
										respuestaBot =respuestaBot+"\nAdministrador Servicios: " + administradores.ADMINISTRADOR_SERVICIOS + "\nCEL: " + administradores.CEL_ADMINISTRADOR_SERVICIOS + "\nEXT: " + administradores.EXT_ADMINISTRADOR_SERVICIOS;
									}if(administradores.ADMINISTRADOR_COMERCIAL_SERVICIOS != 'N/A'){
										respuestaBot =respuestaBot+"\nAdministrador Comercial y Servicios: " + administradores.ADMINISTRADOR_COMERCIAL_SERVICIOS + "\nCEL: " + administradores.CEL_ADMINISTRADOR_COMERCIAL_SERVICIOS + "\nEXT: " + administradores.EXT_ADMINISTRADOR_COMERCIAL_SERVICIOS;
									}if(administradores.ESPECIALISTA_COMERCIAL_SERVICIOS != 'N/A'){
										respuestaBot =respuestaBot+"\nEspecialista Comercial y Servicios: " + administradores.ESPECIALISTA_COMERCIAL_SERVICIOS + "\nCEL: " + administradores.CEL_ESPECIALISTA_COMERCIAL_SERVICIOS + "\nEXT: " + administradores.EXT_ESPECIALISTA_COMERCIAL_SERVICIOS;
									}//respuestaBot =respuestaBot + "\n\nSituación de Emergencia: \nPersonal de Apertura Agencia: "+ administradores.PER_APERTURA_AGENCIA + "\nCEL: " + administradores.CEL_PER_APERTURA_AGENCIA + "\nEXT: " + administradores.EXT_PER_APERTURA_AGENCIA + "\nCONVENCIONAL: " + administradores.CONV_PER_APERTURA_AGENCIA;
								sendResponse(respuestaBot);
								sendAnalytics(nameW);
								});
							 } 	
						});
					 }
				});
			});
		}
	}//Proceso Busqueda de administrador de agencia por nombre en la base de datos Mongo Atlas
	else if(action == "administradores"){
		if(req.body.queryResult.parameters.AdministradorNombreAgencia.NombreAgencia == undefined || req.body.queryResult.parameters.AdministradorNombreAgencia.NombreAgencia == ''){
			graph.get(id+"?fields=name,email", function(err, res){
				nameW=res.name
				sendResponse(respuestaBot);
				sendAnalytics(nameW);
			});
		}else{
			graph.get(id+"?fields=name,email", function(err, res){
				nameW=res.name	
				var query  = Administradores.where({ NOMBRE: req.body.queryResult.parameters.AdministradorNombreAgencia.NombreAgencia});
				query.findOne(function (err, administradores){
					if(administradores==undefined){
						sendResponse(respuestaBot);
						sendAnalytics(nameW);
					}else{
						respuestaBot="Agencia "+ administradores.NOMBRE+":";
						if (err) {
							res.status(500).send(err);
						}if(administradores.ADMINISTRADOR_COMERCIAL != 'N/A'){
							respuestaBot =respuestaBot+"\nAdministrador Comercial: " + administradores.ADMINISTRADOR_COMERCIAL + "\nCEL: " + administradores.CEL_ADMINISTRADOR_COMERCIAL + "\nEXT: " + administradores.EXT_ADMINISTRADOR_COMERCIAL;
						}if(administradores.ADMINISTRADOR_SERVICIOS != 'N/A'){
							respuestaBot =respuestaBot+"\nAdministrador Servicios: " + administradores.ADMINISTRADOR_SERVICIOS + "\nCEL: " + administradores.CEL_ADMINISTRADOR_SERVICIOS + "\nEXT: " + administradores.EXT_ADMINISTRADOR_SERVICIOS;
						}if(administradores.ADMINISTRADOR_COMERCIAL_SERVICIOS != 'N/A'){
							respuestaBot =respuestaBot+"\nAdministrador Comercial y Servicios: " + administradores.ADMINISTRADOR_COMERCIAL_SERVICIOS + "\nCEL: " + administradores.CEL_ADMINISTRADOR_COMERCIAL_SERVICIOS + "\nEXT: " + administradores.EXT_ADMINISTRADOR_COMERCIAL_SERVICIOS;
						}if(administradores.ESPECIALISTA_COMERCIAL_SERVICIOS != 'N/A'){
							respuestaBot =respuestaBot+"\nEspecialista Comercial y Servicios: " + administradores.ESPECIALISTA_COMERCIAL_SERVICIOS + "\nCEL: " + administradores.CEL_ESPECIALISTA_COMERCIAL_SERVICIOS + "\nEXT: " + administradores.EXT_ESPECIALISTA_COMERCIAL_SERVICIOS;
						}//respuestaBot =respuestaBot + "\n\nSituación de Emergencia: \nPersonal de Apertura Agencia: "+ administradores.PER_APERTURA_AGENCIA + "\nCEL: " + administradores.CEL_PER_APERTURA_AGENCIA + "\nEXT: " + administradores.EXT_PER_APERTURA_AGENCIA + "\nCONVENCIONAL: " + administradores.CONV_PER_APERTURA_AGENCIA;
						sendResponse(respuestaBot);
						 sendAnalytics(nameW);
					}					
				  });		
			}); 
		} 
	 }//Proceso busqueda de gerente por nombre en la base de datos Mongo Atlas
	else if(action == "gerentes"){
	 	if(req.body.queryResult.parameters.GerenteNombreAgencia.NombreAgencia == undefined || req.body.queryResult.parameters.GerenteNombreAgencia.NombreAgencia == ''){
			graph.get(id+"?fields=name,email", function(err, res){
				nameW=res.name
				sendResponse(respuestaBot);				
				sendAnalytics(nameW);
			});
		}else{
			graph.get(id+"?fields=name,email", function(err, res){
				nameW=res.name	
				var query  = Gerentes.where({ NOMBRE: req.body.queryResult.parameters.GerenteNombreAgencia.NombreAgencia});
				query.findOne(function (err, gerentes) {
					if(gerentes==undefined){
						sendResponse(respuestaBot);
						sendAnalytics(nameW);
					}else{
						respuestaBot="Agencia "+ gerentes.NOMBRE+":";
						if (err) {
						  res.status(500).send(err);
						}if(gerentes.GERENTE_AGENCIA != 'N/A'){
							//respuestaBot =respuestaBot+"\nGerente Agencia: " + gerentes.GERENTE_AGENCIA + "\nCEL: " + gerentes.CEL_GERENTE_AGENCIA + "\nEXT: " + gerentes.EXT_GERENTE_AGENCIA + "\nCONVENCIONAL: " + gerentes.CONV_GERENTE_AGENCIA;
							respuestaBot =respuestaBot+"\nGerente Agencia: " + gerentes.GERENTE_AGENCIA + "\nCEL: " + gerentes.CEL_GERENTE_AGENCIA + "\nEXT: " + gerentes.EXT_GERENTE_AGENCIA 
						}	sendResponse(respuestaBot);
							sendAnalytics(nameW);
					}
				});			
			});
		}
	 }//Proceso de busqueda de agencia por centro de costos a la base de Mongo Atlas
	else if(action == "cc"){
		 //console.log(req.body.queryResult.parameters)
	 	if(req.body.queryResult.parameters.number == undefined || req.body.queryResult.parameters.number == ''){
			 graph.get(id+"?fields=name,email", function(err, res){
				nameW=res.name
				sendResponse(respuestaBot);				
				sendAnalytics(nameW);
			});
		}else{
			graph.get(id+"?fields=name,email", function(err, res){
				nameW=res.name;
				ccAux=req.body.queryResult.parameters.number;
				cc=ccAux.toString();
				console.log(cc)
				var query  = Agencias.where({ CC: cc});
				query.findOne(function (err, agencias) {
					if(agencias==undefined){
						sendResponse(respuestaBot);
						sendAnalytics(nameW);
					}else if (err) {
					  res.status(500).send(err);
					}else{
						respuestaBot = "La Agencia " + agencias.NOMBRE + " cc: "+ agencias.CC + " se encuentra en: \n" + agencias.PROVINCIA + "- " + agencias.CUIDAD + ", " + agencias.DIRECCION + "\nReferencia: " + agencias.REFERENCIA + "\nTeléfonos: " + agencias.TELF_1 + " /" + agencias.TELF_2 + "\nHorarios \n Lunes a Viernes: " + agencias.H_SEMANA + "\n Sábado: " + agencias.H_SABADO + "\n Domingo: " + agencias.H_DOMINGO
						sendResponse(respuestaBot);
						sendAnalytics(nameW);
					}
				  });	
			});	
		 }
	 }//Proceso de Busqueda de jefaturas a la base de datos Mongo Atlas
	else if(action == "jefaturas"){
		 //console.log(req.body.queryResult.parameters)
	 	if(req.body.queryResult.parameters.JefaturaNombreAgencia.NombreAgencia == undefined || req.body.queryResult.parameters.JefaturaNombreAgencia.NombreAgencia == ''){
			 graph.get(id+"?fields=name,email", function(err, res){
				nameW=res.name
				sendResponse(respuestaBot);				
				sendAnalytics(nameW);
			});
		}else{
			graph.get(id+"?fields=name,email", function(err, res){
				nameW=res.name
				var query1  = Gerentes.where({ NOMBRE: req.body.queryResult.parameters.JefaturaNombreAgencia.NombreAgencia});
				query1.findOne(function (err, gerentes) {				
					if(gerentes==undefined){
						sendResponse(respuestaBot);
						sendAnalytics(nameW);
					}else if (err) {
					  res.status(500).send(err);
					}else{
						respuestaBot="Agencia "+ gerentes.NOMBRE+":";
						//respuestaBot = respuestaBot+"\nGerente Agencia: " + gerentes.GERENTE_AGENCIA + "\nCEL: " + gerentes.CEL_GERENTE_AGENCIA + "\nEXT: " + gerentes.EXT_GERENTE_AGENCIA + "\nCONVENCIONAL: " + gerentes.CONV_GERENTE_AGENCIA;
						respuestaBot = respuestaBot+"\nGerente Agencia: " + gerentes.GERENTE_AGENCIA + "\nCEL: " + gerentes.CEL_GERENTE_AGENCIA + "\nEXT: " + gerentes.EXT_GERENTE_AGENCIA
						var query2  = Administradores.where({ NOMBRE: req.body.queryResult.parameters.JefaturaNombreAgencia.NombreAgencia});
						query2.findOne(function (err, administradores) {
							respuestaBot=respuestaBot+"\n"
							if (err) {
							  res.status(500).send(err);
							}if(administradores.ADMINISTRADOR_COMERCIAL != 'N/A'){
								respuestaBot =respuestaBot+"\nAdministrador Comercial: " + administradores.ADMINISTRADOR_COMERCIAL + "\nCEL: " + administradores.CEL_ADMINISTRADOR_COMERCIAL + "\nEXT: " + administradores.EXT_ADMINISTRADOR_COMERCIAL;
							}if(administradores.ADMINISTRADOR_SERVICIOS != 'N/A'){
								respuestaBot =respuestaBot+"\nAdministrador Servicios: " + administradores.ADMINISTRADOR_SERVICIOS + "\nCEL: " + administradores.CEL_ADMINISTRADOR_SERVICIOS + "\nEXT: " + administradores.EXT_ADMINISTRADOR_SERVICIOS;
							}if(administradores.ADMINISTRADOR_COMERCIAL_SERVICIOS != 'N/A'){
								respuestaBot =respuestaBot+"\nAdministrador Comercial y Servicios: " + administradores.ADMINISTRADOR_COMERCIAL_SERVICIOS + "\nCEL: " + administradores.CEL_ADMINISTRADOR_COMERCIAL_SERVICIOS + "\nEXT: " + administradores.EXT_ADMINISTRADOR_COMERCIAL_SERVICIOS;
							}if(administradores.ESPECIALISTA_COMERCIAL_SERVICIOS != 'N/A'){
								respuestaBot =respuestaBot+"\nEspecialista Comercial y Servicios: " + administradores.ESPECIALISTA_COMERCIAL_SERVICIOS + "\nCEL: " + administradores.CEL_ESPECIALISTA_COMERCIAL_SERVICIOS + "\nEXT: " + administradores.EXT_ESPECIALISTA_COMERCIAL_SERVICIOS;
							}//respuestaBot =respuestaBot + "\n\nSituación de Emergencia: \nPersonal de Apertura Agencia: "+ administradores.PER_APERTURA_AGENCIA + "\nCEL: " + administradores.CEL_PER_APERTURA_AGENCIA + "\nEXT: " + administradores.EXT_PER_APERTURA_AGENCIA + "\nCONVENCIONAL: " + administradores.CONV_PER_APERTURA_AGENCIA;	
							sendResponse(respuestaBot);
								sendAnalytics(nameW);
						});
					}
						
				});
			});	
		 }
	 }//Proceso de busqueda de reclamos en la base de datos Mongo Atlas
	else if(action == "reclamos"){
	 	if(req.body.queryResult.parameters.ReclamosTipos == '' || req.body.queryResult.parameters.ReclamosTipos == undefined){
			graph.get(id+"?fields=name,email", function(err, res){
				nameW=res.name
				sendResponse(respuestaBot);				
				sendAnalytics(nameW);
			});
		}else{
			graph.get(id+"?fields=name,email", function(err, res){
				nameW=res.name
				var query  = Reclamos.where({ TIPO: req.body.queryResult.parameters.ReclamosTipos });
				query.findOne(function (err, reclamos) {
					if (err) {
					  res.status(500).send(err);
					}else if(reclamos.AYUDA=="VACIO"){
						respuestaBot = "TIPO:" + reclamos.TIPOA +"\nSUBTIPO:"+ reclamos.TIPO +"\n\nPara más información ingresa en el siguiente link: http://bit.ly/2IRBCzG "
					}else if(reclamos.TIPO == "COPIAS DEPÓSITOS,CHEQUES,RET. REVISIÓN INT. ESP. TIEMPO Y VOL." || reclamos.TIPO == "SOLICITUD DOCUMENTACIÓN REVISIÓN INTERNA"){
						respuestaBot = "TIPO:COPIAS \nSUBTIPO:COPIAS DEPÓSITOS,CHEQUES,RET. REVISIÓN INT. ESP. TIEMPO Y VOL. \n\nIngresar solo requerimientos para revisión interna,  especiales por tiempo o volumen, es decir a partir de la 11va copia.  Estos casos están sujetos a verificación por parte del Área de Auditoria o Entes de Control. Favor enviar por mail al solucionador, únicamente con el detalle de documentos en formato Excel,  en base al estado de cuenta del cliente.  En comentarios indicar el total de documentos requeridos. \n\nTIPO:DOCUMENTOS REVISIÓN INTERNA \nSUBTIPO:SOLICITUD DOCUMENTACIÓN REVISIÓN INTERNA \n\nA través de este subtipo las unidades de Atención al Cientes, Riesgos, Negocios, Cumplimiento, Auditoría y Pague Ya, pueden solicitar Copias de: Estados de cuenta TC, Contratos y habilitantes firmados TC firmados por clientes,  Auditorias de entrega de estados de cuenta TC \n\nPara más información ingresa en el siguiente link: http://bit.ly/2IRBCzG "
					}else if(reclamos.TIPO == "COPIAS ESTADOS CTA. REQUERIMIENTOS ESPECIALES TIEMPO Y VOLUMEN" || reclamos.TIPO == "MOVIMIENTOS AHORROS REQUERIMIENTOS ESPECIALES POR TIEMPO Y VOLUMEN"){
						respuestaBot = "TIPO:COPIAS \nSUBTIPO:COPIAS ESTADOS CTA. REQUERIMIENTOS ESPECIALES TIEMPO Y VOLUMEN \n\nPor este subtipo aplica solicitar movimientos de cuentas corrientes. Ingresar requerimientos de movimientos cuya fecha sea antes de la migración del 5 de abril del 2012 . Previo al ingreso deben validar la fecha de apertura de la cuenta y que conste activa en los meses requeridos. \n\nTIPO:COPIAS  \nSUBTIPO:MOVIMIENTOS AHORROS REQUERIMIENTOS ESPECIALES POR TIEMPO Y VOLUMEN \n\nReq. de personas naturales ingresa el Call Center,  Req. de personas jurídicas ingresa el Balcón de Servicios . Por este subtipo aplica solicitar movimientos de estado de cuentas de ahorro. Ingresar requerimientos de movimientos cuya fecha sea antes de la migración del 5 de abril del 2012 para atrás. Previo al ingreso deben validar la fecha de apertura de la cuenta y que conste activa en los meses requeridos. Considerar que solo se puede entregar movimientos hasta 10 años. \n\nPara más información ingresa en el siguiente link: http://bit.ly/2IRBCzG "
					}else{
						respuestaBot = "TIPO:" + reclamos.TIPOA +"\nSUBTIPO:"+ reclamos.TIPO +"\n\n"+ reclamos.AYUDA +"\n\nPara más información ingresa en el siguiente link: http://bit.ly/2IRBCzG "
					}sendResponse(respuestaBot);
					sendAnalytics(nameW);
				  });
				
			});	
		}	
	 }else if(action == "agradecer"){
	 	graph.get(id+"?fields=name,first_name,last_name,email", function(err, res){
			email=res.email;
			nameW=res.name	
			sendResponse(respuesta); 
			sendAgradecer(nameW);
		});
	 }else { //Envio de información directa webhook a Dialogflow	
		graph.get(id+"?fields=name,first_name,last_name,email", function(err, res){
			email=res.email;
			nameW=res.name	
			sendResponse(respuesta); 
			sendAnalytics(nameW);
		});
	 }
	
	function numCliente(cliente){
		for(var i=0; i < cliente.CLIENTES.length; i++){
			//console.log(cliente.CLIENTES[i].Confirmacion)
			if(cliente.CLIENTES[i].Confirmacion=="NO"){
				return i;
				break;
			}   
		}return 100;
	}
	
	function sendEmail(email, documento){
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
					path: documento
				}
			    ]
		}
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) throw new Error(err)
			    res.statusCode = 200
			    res.end('Email sent!')
		})
	}
	
	function getContext(CausaSalida, BotResponde){
			if(CausaSalida == 'Renuncia voluntaria'){
				let respuesta ={
					fulfillmentText : BotResponde,
					fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
					outputContexts : [{'name': req.body.session+'/contexts/flujo2','lifespanCount':1}]
				}
				return respuesta;
			}else if(CausaSalida == 'Despido'){
				let respuesta ={
					fulfillmentText : BotResponde,
					fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
					outputContexts : [{'name': req.body.session+'/contexts/flujo2','lifespanCount':1}]
				}
				return respuesta;
			}else if(CausaSalida == 'Fallecimiento'){
				let respuesta ={
					fulfillmentText : BotResponde,
					fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
					outputContexts : [{'name': req.body.session+'/contexts/flujo3','lifespanCount':1}]
				}
				return respuesta;
			}else if(CausaSalida == 'Visto bueno'){
				let respuesta ={
					fulfillmentText : BotResponde,
					fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
					outputContexts : [{'name': req.body.session+'/contexts/flujo2','lifespanCount':1}]
				}
				return respuesta;
			}else if(CausaSalida == 'Fin contrato eventual'){
				let respuesta ={
					fulfillmentText : BotResponde,
					fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
					outputContexts : [{'name': req.body.session+'/contexts/flujo2','lifespanCount':1}]
				}
				return respuesta;
			}else{
				let respuesta ={
					fulfillmentText : BotResponde,
					fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
					outputContexts : [{'name': req.body.session+'/contexts/flujo1','lifespanCount':1}]
				}
				return respuesta;
			} 				
	}
	
	function getCausa(){
		var CausaSalida;
		for(i=0;i<len;i++){
			const outputContexts= req.body.queryResult.outputContexts[i].name;
			const nombreContexto= outputContexts.substr(-7,7)
			if(nombreContexto =='generic'){
				CausaSalida=req.body.queryResult.outputContexts[i].parameters.CausasSalida;
			}
		}return CausaSalida;
	}
	
	function sendSalidaCajero (nameUser, email){
		var cajero = new Object();
		cajero.SesionId = sessionId;
		cajero.IdLS = id;
		cajero.NombreLS = nameUser;
		cajero.CorreoLS = email;
		for(var i=0;i<len;i++){
			const outputContexts= req.body.queryResult.outputContexts[i].name;
			const nombreContexto= outputContexts.substr(-10,10)
			if(nombreContexto =='2-followup'){
				cajero.NombreCajero = req.body.queryResult.outputContexts[i].parameters.NombreCajero;
				continue;
			}if(nombreContexto =='ts/generic'){
				cajero.IdCajero = String(req.body.queryResult.outputContexts[i].parameters.cedula);
				cajero.CausaSalida = req.body.queryResult.outputContexts[i].parameters.CausasSalida;
				cajero.FechaSalida = req.body.queryResult.outputContexts[i].parameters.date;
				continue;
			}if(nombreContexto =='followup-2'){
				cajero.AdjCartaRenuncia = req.body.queryResult.outputContexts[i].parameters.AdjCartaRenuncia;
				continue;
			}
		}
		cajero.AdjHojaSalida = req.body.originalDetectIntentRequest.payload.data.message.attachments[0].payload.url;		
		console.log(cajero)
		let newSalidaCajero = new SalidaCajeros(cajero);
		newSalidaCajero.save(function (err) {
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
	
	async function getUserMiPortal(email) {
		var nameUser;
		const respuesta = await Colaboradores.find({ EMAIL_EMPLEADO: email }).
		then(colaborador => { 
			if(colaborador == undefined || colaborador == '' || colaborador == []){
				nameUser = email + ' no encontrado en la Base';
			}else{
				nameUser = colaborador[0].NOMBRE;
			}
		 });
		return nameUser
	}
		
	async function sendAnalytics (nameUser) {
	//console.log(req.body.queryResult.fulfillmentMessages);
	//Creción del Objeto Json para almacenar en Mongo Atlas
		if(action == "encuesta") {
			if(nameUser==undefined){
				//nameUser=getUserMiPortal();
				console.log(nameUser);
				nameUser='no vale'
			}
			respuestaBot=String(req.body.queryResult.fulfillmentMessages[2].text.text[0])
			var historial = new Object();
			historial.SesionId = sessionId;
			historial.UsuarioId = id;
			historial.NombreUsuario= nameUser;
			historial.UsuarioDice = req.body.queryResult.queryText;
			historial.NombreIntento= req.body.queryResult.intent.displayName;
			historial.BotResponde= respuestaBot;
		} else {
			if(nameUser==undefined){
				//nameUser='4u.pichincha.com'
				nameUser = await getUserMiPortal();
				console.log(nameUser)
			}
			var historial = new Object();
			historial.SesionId = sessionId;
			historial.UsuarioId = id;
			historial.NombreUsuario= nameUser;
			historial.UsuarioDice = req.body.queryResult.queryText;
			historial.NombreIntento= req.body.queryResult.intent.displayName;
			historial.BotResponde= respuestaBot;
		}
	//Envio de objeto con mensaje a Mongo Atlas
		//console.log(historial);
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
