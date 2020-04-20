exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require('axios').default;
	message.reply('Appel AXIOS');
	
	// Test 
	axios({
		method: 'POST',
		url: 'http://ligue.mtgnantes.fr',
		data: {
			info: 'test'
		}
	}).then( function (msg) {
		message.channel.send('Connexion faite');
		message.channel.send('Message : ' + JSON.parse(msg).count );
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
