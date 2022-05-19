//var graph = require('fbgraph');
const FacebookGraph = require('facebookgraph');
//const access_token = 'DQVJ2RHE0eVZAORDNiOWJ2MzJJek0tWlB0OXpONFZALRUhxNmJPanhpc0ltR1ZAWZAzMzaGN5ZA01adXgzOWd3ZAFVNS1lhLUc1YW5VMmNJY2pGZAklKLWZAkdl9uMWtQZAmxnLTJ6TzZACX2FXSUozOHZAqR1VpZAVZAVZAVdmNWVfa3p2TXBfbTJEWXlROTBzZAjJiX2RmYW5MRFBVamM4VDBxeGxjc29DY0VMYXNTeGY3Q3p2MXVSU2lBWjByc01pVmR3QTVYZA2RSTUZAaazhTZAWJMSl91YjZA3SQZDZD';
//const access_token = 'DQVJ1c0hlREl1YlQ5ZA1RocmZAzZAXZAQOVc5LVFjdDFIeTZAlY2ZAia1E4VFFWcXo1ajM3RnpfQmNoYm9vajljdDlZAei16ZAGpMVHd1eHNkaVhkVkdzZAGVBbDJhM3JWa3YyMVRRVTdlRnVUUkdrTkNJVjhXaDNhM1l5T0xuQ2VwMTJMam1FbU85YlBKSm5CQjhQdG1uOW5ZAVV8yWnUtVVU4R3ljSkFVelp4V3B3ZAlMtUXk2NXVLWERaQ2x6Y0Ffd0xXQURhZATd4azdRYkFoNlk3QVN5agZDZD';
const access_token = 'DQVJ1ZAHVzaXZA4V3JkYmhsVkVlOGhlejU2MVBkTGRUMkxXSE1oTEtWV29rTERHdGo1cDhHRm4waVZAVT0xReUc0OUVkVlgtb1c4ajNMUGRrMEZA6Q2pVeTRYd1ZAmNTV6MWRqVnR3eS02d2RQcmhLZAjN4WmdtcnV4dEY1dEJsanA4VzZA5Sno4ZAnZAIWGM3UjBKd3lxOXhwVDI3elk1cWZAYdFZABNmdxaEs0WXoxN190Q2I3a3BDU1M4VEpVaGQ0WFVxRzQycFV5d0RVSUFheTNOTDRrTAZDZD';
//graph.setVersion("2.11");
//graph.setAccessToken(access_token);

const graph = new FacebookGraph(access_token)

module.exports = {
	async graphID(id){	
		console.log(id)
		const zuck = await graph.get(id+"?fields=name,email");
		if(zuck==undefined){
			let error = {name:id,email:id+'@pichincha.com'}
			return error;
		}else{
			return zuck;
		}
/*		//	return zuck;
			graph.get("100036857766826"+"?fields=name,email", function(err, res){
				if(err) {
					console.log(err);
				}else{
					console.log(res.name);
					console.log(res.email)
				}
			});*/
	}
};
