var graph = require('fbgraph');
//const FacebookGraph = require('facebookgraph');
const access_token = 'DQVJ2NUhWeU1kOW5YT0xEQUFYdkkyR3pUUVgydFhieFUxaXpoa3ZAvbERaOXYxNHcxa2Rmbm5tWmRjMm1veVhRWC1Db1hablN2ek1mMlI4dXhzNlJ6ZATZAyV3p4bllMcDZAXM3BkUW02VmhxbEVGV2tmSnhoQ2o5YmdlSUZAjdW9sM0xkMS10NllHZAzdfWExidGJDUnhjMEN6UFVLSjU1ZA29uNnlsbGduRjYzS3RFZAzFxYkhLUDFKRWJQTWRvWndGNmtteUZA4eUpsNEp1RWdSckZAPMQZDZD';
graph.setAccessToken(access_token);
//const graph = new FacebookGraph(access_token)

module.exports = {
	async graphID(id){
		//const zuck = await graph.get(id+"?fields=name,email");
		//console.log(zuck);
		//return zuck;
		graph.get(id+"?fields=name,email", function(err, res){
			console.log(res.name);
			console.log(res.email)
		});
	}
};
