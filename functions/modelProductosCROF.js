module.exports = {
  async modProductosCROF(){
      let respuesta ={
				fulfillmentText :"👈🏼<-Navega por todas las opciones ->👉🏼",
				"fulfillmentMessages":[
				    {
				      "text": {
					"text": [
					  "👈🏼<-Navega por todas las opciones ->👉🏼"
					]
				      },
				      "platform": "FACEBOOK"
				    },
						{
				      "card": {
					"title": "Chequeras",
					"imageUri": "https://storage.googleapis.com/imagenes-pibot/CROF/Chequeras.png",
					"buttons": [
					 {
					    "text": "Seleccionar",
					    "postback": "ADMINISTRACION DE CHEQUERAS EN AGENCIAS"
					  }
					]
				      },
				      "platform": "FACEBOOK"
				    },
				    {
				      "card": {
					"title": "Giros Exterior/ISD",
					"imageUri": "https://storage.googleapis.com/imagenes-pibot/CROF/GirosAlExterior.png",
					"buttons": [
					  {
					    "text": "Seleccionar",
					    "postback": "ESTANDAR DE TRABAJO GIROS AL EXTERIOR  EN DOLARES A LA RED DE AGENCIAS"
					  }
					]
				      },
				      "platform": "FACEBOOK"
				    },
				    {
				      "card": {
					"title": "Pre cancelaciones",
					"imageUri": "https://storage.googleapis.com/imagenes-pibot/CROF/PrecancelacionInversion_final.png",
					"buttons": [
					  {
					    "text": "Seleccionar",
					    "postback": "INSTRUCTIVO PRE CANCELACION  INVERSION"
					  }
					]
				      },
				      "platform": "FACEBOOK"
				    },
				    {
				      "card": {
					"title": "Pignoración Inversión",
					"imageUri": "https://storage.googleapis.com/imagenes-pibot/CROF/Pignoracion_final.png",
					"buttons": [
					  {
					    "text": "Seleccionar",
					    "postback": "ENDOSO Y PIGNORACION DE INVERSION"
					  }
					]
				      },
				     "platform": "FACEBOOK"
				    },
				    {
				      "card": {
					"title": "Cheques Emergencia",
					"imageUri": "https://storage.googleapis.com/imagenes-pibot/CROF/ChequesEmergencia_final.png",
					"buttons": [
					  {
					    "text": "Seleccionar",
					    "postback": "EMISION CHEQUES DE EMERGENCIA"
					  }
					]
				      },
				      "platform": "FACEBOOK"
				    },
				    {
				      "card": {
					"title": "Cheques Exterior",

					"imageUri": "https://storage.googleapis.com/imagenes-pibot/CROF/ChequesExterior_final.png",

					"buttons": [
					  {
					    "text": "Seleccionar",
					    "postback": "SOP EMISION CHEQUES DEL EXTERIOR EN DOLARES"
					  }
					]
				      },
				      "platform": "FACEBOOK"
				    },
				    {
				      "card": {
					"title": "Cheques Devueltos",
					"imageUri": "https://storage.googleapis.com/imagenes-pibot/CROF/ChequeDevuelto_final.png",
					"buttons": [
					  {
					    "text": "Seleccionar",
					    "postback": "PROCEDIMIENTO INTEGRAL CHEQUES DEVUELTOS EN AGENCIAS"
					  }
					]
				      },
				      "platform": "FACEBOOK"
				    },
				    {
				      "card": {
					"title": "Prohibición Cheques",
					"imageUri": "https://storage.googleapis.com/imagenes-pibot/CROF/ProhibicionCheques_final.png",
					"buttons": [
					  {
					    "text": "Seleccionar",
					    "postback": "PROHIBICION DE CHEQUES Y CARTOLAS"
					  }
					]
				      },
				      "platform": "FACEBOOK"
				    },
				    {
				      "card": {
					"title": "Cancelación Cuentas",
					"imageUri": "https://storage.googleapis.com/imagenes-pibot/CROF/CancelacionCuentas_final.png",
					"buttons": [
					  {
					    "text": "Seleccionar",
					    "postback": "CANCELACION  DE CUENTAS"
					  }
					]
				      },
				      "platform": "FACEBOOK"
				    },
				    {
				      "card": {
					"title": "Eliminación e Inclusión de Firmas",
					"imageUri": "https://storage.googleapis.com/imagenes-pibot/CROF/EliminacionFirmas_final.png",
					"buttons": [
					  {
					    "text": "Seleccionar",
					    "postback": "ELIMINACION E INCLUSION DE FIRMAS"
					  }
					]
				      },
				      "platform": "FACEBOOK"
				    },
				    {
				      "text": {
					"text": [
					  "Conoce sobre: Chequeras, Giros Exterior/ISD, Pre cancelaciones, Pignoración Inversión, Cheques Exterior Cheques Devueltos, Cancelacion Cuentas, Prohibición Cheques, Firmas"
					]
				      }
				    }
				]
			} 
      return respuesta;
  } 
} 
