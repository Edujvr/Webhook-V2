var graph = require('fbgraph');
const access_token = 'DQVJ2eHdaZAjV5a1dOdGVLNjN1TG9xeEZAhZAlRQOGRvN3dzRXd6SHFCTXN5X3J5T29fazVxNXFJOFFOel9QenhaYVVOM2g0ZADM2MnBlSGdzZAG1Ra2g5eXo5NGJ5a2FraE45Um5mZAmpuMXR6LU4zVV81ZAkRPbndsb1pfSDVwQXJVaWVXVUZAYcDJkNVpHTHgyQjBsMy1qZA1F0UVN6ZAjhFandzYXpnR01qQWlQa2FCZAHAzZA2h2WUtSc2lhWEphYko4S0V1TGpGbTRJb0JkQjRPU216MwZDZD';
module.exports = {
	async graphID(id){
		console.log('entro')
		graph.setAccessToken(access_token);
		var graphObject = graph.get(id, function(err, res) {
		    console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
		});
		//console.log(graphObject)
		//return graph.get(id+"?fields=name,email")
		/*
		graph.get(id+"?fields=name,email",async function(err, res){
			console.log(res);
			return await res;
		});*/
		console.log('salio')
	}
}
