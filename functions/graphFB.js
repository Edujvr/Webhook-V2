var graph = require('fbgraph');
//const FacebookGraph = require('facebookgraph');
const access_token = 'DQVJ1c0hlREl1YlQ5ZA1RocmZAzZAXZAQOVc5LVFjdDFIeTZAlY2ZAia1E4VFFWcXo1ajM3RnpfQmNoYm9vajljdDlZAei16ZAGpMVHd1eHNkaVhkVkdzZAGVBbDJhM3JWa3YyMVRRVTdlRnVUUkdrTkNJVjhXaDNhM1l5T0xuQ2VwMTJMam1FbU85YlBKSm5CQjhQdG1uOW5ZAVV8yWnUtVVU4R3ljSkFVelp4V3B3ZAlMtUXk2NXVLWERaQ2x6Y0Ffd0xXQURhZATd4azdRYkFoNlk3QVN5agZDZD';
//const access_token = 'DQVJ2NUhWeU1kOW5YT0xEQUFYdkkyR3pUUVgydFhieFUxaXpoa3ZAvbERaOXYxNHcxa2Rmbm5tWmRjMm1veVhRWC1Db1hablN2ek1mMlI4dXhzNlJ6ZATZAyV3p4bllMcDZAXM3BkUW02VmhxbEVGV2tmSnhoQ2o5YmdlSUZAjdW9sM0xkMS10NllHZAzdfWExidGJDUnhjMEN6UFVLSjU1ZA29uNnlsbGduRjYzS3RFZAzFxYkhLUDFKRWJQTWRvWndGNmtteUZA4eUpsNEp1RWdSckZAPMQZDZD';
graph.setAccessToken(access_token);
//const graph = new FacebookGraph(access_token)

module.exports = {
	async graphID(id){	
		console.log(id)
		/*const zuck = await graph.get(id+"?fields=name,email");
		if(zuck==undefined){
			let error = {name:id,email:id+'@pichincha.com'}
			return error;
		}else{
			return zuck;
		}
*/		//	return zuck;
			graph.get(100036857766826+"?fields=name,email", function(err, res){
				if(err) {
					res.status(500).send(err);
				}else{
					console.log(res.name);
					console.log(res.email)
				}
			});
	}
};
