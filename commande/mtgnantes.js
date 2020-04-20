exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require('axios').default;
	
	// Test 
	axios.post('http://ligue.mtgnantes.fr/', {
		info: 'test'
	}).then(function (msg) {
		message.channel.send(msg);
	}).catch(function (error) {
		message.channel.send(error);
	});
}
