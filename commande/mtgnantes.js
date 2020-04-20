exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require('axios').default;
	
	// Test 
	axios({
		method: 'POST',
		url: 'http://ligue.mtgnantes.fr',
		data: {
			info: 'test'
		},
		responseType: 'json'
	}).then( function (msg) {
		message.channel.send('Envoi OK');
		let retour = JSON.parse( msg );
		message.channel.send('Parse JSON');
		message.channel.send( retour.info );
	}).catch( function (error) {
		message.channel.send('Erreur : ' + error );
	});
		
	/*
	axios.post('http://ligue.mtgnantes.fr/', {
		info: 'test'
	}).then(function (msg) {
		message.channel.send(msg);
	}).catch(function (error) {
		message.channel.send(error);
	});
	//*/
}
