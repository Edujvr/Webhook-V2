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
			//console.log('extrayendo')
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
		/*var documento,CausaSalida;
		for(i=0;i<len;i++){
			const outputContexts= req.body.queryResult.outputContexts[i].name;
			const nombreContexto= outputContexts.substr(-7,7)
			if(nombreContexto =='generic'){
				CausaSalida=req.body.queryResult.outputContexts[i].parameters.CausasSalida;
			}else{
				//console.log('extrayendo')
			}
		}*/
		var CausaSalida = getCausa();
		console.log(CausaSalida);
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
			console.log(FechaActualMin)
			if(FechaSalida <= FechaActualMax && FechaSalida >= FechaActualMin){
				respuestaBot='Ahora por favor toma foto a la hoja de salida que te proporcionamos arriba y cárgala en este feed.'
				respuesta=getContext(CausaSalida,respuestaBot);
			}else{
				respuestaBot='Lo siento la fecha ingresada no esta en el rango permitido para notificar la salida, por favor comunicarse con su generalista'  
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
			/*if(CausaSalida == 'Renuncia voluntaria'){
				let respuesta ={
					fulfillmentText : req.body.queryResult.fulfillmentText,
					fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
					outputContexts : [{'name': req.body.session+'/contexts/SalidaCajeros-Paso7A-followup','lifespanCount':3}]
				}
			}else if(CausaSalida == 'Despido'){
				let respuesta ={
					fulfillmentText : req.body.queryResult.fulfillmentText,
					fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
					outputContexts : [{'name': req.body.session+'/contexts/SalidaCajeros-Paso7A-followup','lifespanCount':3}]
				}
			}else if(CausaSalida == 'Fallecimiento'){
				let respuesta ={
					fulfillmentText : req.body.queryResult.fulfillmentText,
					fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
					outputContexts : [{'name': req.body.session+'/contexts/SalidaCajeros-Paso5-followup','lifespanCount':3}]
				}
			}else if(CausaSalida == 'Visto bueno'){
				let respuesta ={
					fulfillmentText : req.body.queryResult.fulfillmentText,
					fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
					outputContexts : [{'name': req.body.session+'/contexts/SalidaCajeros-Paso7A-followup','lifespanCount':3}]
				}
			}else if(CausaSalida == 'Fin contrato eventual'){
				let respuesta ={
					fulfillmentText : req.body.queryResult.fulfillmentText,
					fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
					outputContexts : [{'name': req.body.session+'/contexts/SalidaCajeros-Paso7A-followup','lifespanCount':3}]
				}
			}else{
				let respuesta ={
					fulfillmentText : req.body.queryResult.fulfillmentText,
					fulfillmentMessages:req.body.queryResult.fulfillmentMessages,
					outputContexts : [{'name': req.body.session+'/contexts/SalidaCajeros-Paso6-followup-2','lifespanCount':3}]
				}
			} */
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
					}	respuestaBot = "La Agencia " + agencias.NOMBRE + " cc: "+ agencias.CC + " se encuentra en: \n" + agencias.PROVINCIA + "- " + agencias.CUIDAD + ", " + agencias.DIRECCION + "\nReferencia: " + agencias.REFERENCIA + "\nTeléfonos: " + agencias.TELF_1 + " /" + agencias.TELF_2 + "\nHorarios \n Lunes a Viernes: " + agencias.H_SEMANA + "\n Sábado: " + agencias.H_SABADO + "\n Domingo: " + agencias.H_DOMINGO
				var query1  = Gerentes.where({ NOMBRE: req.body.queryResult.parameters.NombreAgencia});	
					/////////////////////
					 query1.findOne(function (err, gerentes) {
					//respuestaBot="Agencia "+ gerentes.NOMBRE+":";
					if (err) {
					  res.status(500).send(err);
					}respuestaBot = respuestaBot+"\nGerente Agencia: " + gerentes.GERENTE_AGENCIA + "\nCEL: " + gerentes.CEL_GERENTE_AGENCIA + "\nEXT: " + gerentes.EXT_GERENTE_AGENCIA;
							
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
						}
					
					
					///////////////////////
					sendResponse(respuestaBot);
					sendAnalytics(nameW);
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
				query.findOne(function (err, administradores) {
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
					}sendResponse(respuestaBot);
					 sendAnalytics(nameW);
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
					respuestaBot="Agencia "+ gerentes.NOMBRE+":";
					if (err) {
					  res.status(500).send(err);
					}if(gerentes.GERENTE_AGENCIA != 'N/A'){
						respuestaBot =respuestaBot+"\nGerente Agencia: " + gerentes.GERENTE_AGENCIA + "\nCEL: " + gerentes.CEL_GERENTE_AGENCIA + "\nEXT: " + gerentes.EXT_GERENTE_AGENCIA;
					}	sendResponse(respuestaBot);
						sendAnalytics(nameW);
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
					if (err) {
					  res.status(500).send(err);
					}	respuestaBot = "La Agencia " + agencias.NOMBRE + " cc: "+ agencias.CC + " se encuentra en: \n" + agencias.PROVINCIA + "- " + agencias.CUIDAD + ", " + agencias.DIRECCION + "\nReferencia: " + agencias.REFERENCIA + "\nTeléfonos: " + agencias.TELF_1 + " /" + agencias.TELF_2 + "\nHorarios \n Lunes a Viernes: " + agencias.H_SEMANA + "\n Sábado: " + agencias.H_SABADO + "\n Domingo: " + agencias.H_DOMINGO
					sendResponse(respuestaBot);
					sendAnalytics(nameW);
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
					respuestaBot="Agencia "+ gerentes.NOMBRE+":";
					if (err) {
					  res.status(500).send(err);
					}respuestaBot = respuestaBot+"\nGerente Agencia: " + gerentes.GERENTE_AGENCIA + "\nCEL: " + gerentes.CEL_GERENTE_AGENCIA + "\nEXT: " + gerentes.EXT_GERENTE_AGENCIA;
							
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
						}	sendResponse(respuestaBot);
							sendAnalytics(nameW);
					});
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
		var i=0;
		for(i=0;i<len;i++){
		//while(i<=len){
			const outputContexts= req.body.queryResult.outputContexts[i].name;
			const nombreContexto= outputContexts.substr(-10,10)
			console.log(nombreContexto)
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
