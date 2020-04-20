exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require('axios').default;
	
	var args = message.content.slice(prefix.length).trim().split(/ +/g);
	var liste_MV = args[1].split("=")[1];
	
	// Test 
	axios({
		method: 'get',
		url: 'http://edh.mtgnantes.fr/Deck/Recuperer/'+liste_MV,
	}).then( function (response) {
		message.channel.send( response.status );
		message.channel.send( response.data === {} );
		message.channel.send( response.data.length );
		response.data.forEach(element => message.channel.send(element));
	}).catch( function (error) {
		message.channel.send('Erreur : ' + error );
	});
	//*/
}
