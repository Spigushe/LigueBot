exports.run = (client, message, Discord, prefix) => {
	message.reply('pong');
	
	// Appel du package axios
	const axios = require('axios').default;
	message.reply('Appel AXIOS');
	
	// Test 
	axios.post('http://ligue.mtgnantes.fr/', {
		info: 'test'
	}).then(function (msg) {
		message.channel.send(msg);
	}).catch(function (error) {
		message.channel.send(error);
	});
}
