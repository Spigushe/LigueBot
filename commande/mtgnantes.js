exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require('axios').default;
	
	var args = message.split(" ");
	var liste_MV = args[1].split("=")[1];
	
	message.channel.send("Liste MV : https://magic-ville.fr/fr/decks/dl_appr.php?ref="+liste_MV);
	/*
	// Test 
	axios({
		method: 'get',
		url: 'http://edh.mtgnantes.fr/Deck/Recuperer',
		data: {
			info: 'test'
		},
		responseType: 'json'
	}).then( function (msg) {
		message.channel.send('Envoi OK');
	}).catch( function (error) {
		message.channel.send('Erreur : ' + error );
	});
	//*/
}
