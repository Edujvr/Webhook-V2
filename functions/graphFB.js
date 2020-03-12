var graph = require('fbgraph');
var Q = require('q');
const access_token = 'DQVJ2eHdaZAjV5a1dOdGVLNjN1TG9xeEZAhZAlRQOGRvN3dzRXd6SHFCTXN5X3J5T29fazVxNXFJOFFOel9QenhaYVVOM2g0ZADM2MnBlSGdzZAG1Ra2g5eXo5NGJ5a2FraE45Um5mZAmpuMXR6LU4zVV81ZAkRPbndsb1pfSDVwQXJVaWVXVUZAYcDJkNVpHTHgyQjBsMy1qZA1F0UVN6ZAjhFandzYXpnR01qQWlQa2FCZAHAzZA2h2WUtSc2lhWEphYko4S0V1TGpGbTRJb0JkQjRPU216MwZDZD';
graph.setAccessToken(access_token);
module.exports = {
	async graphID(id){
		graph.get(id+"?fields=name,email",setTimeout( function(err, res){
			return res;
			//if (err) deferred.reject(err);
                	//deferred.resolve(res);
		}, 100));
		return deferred.promise
	}
};
