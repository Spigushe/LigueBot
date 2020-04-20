exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require('axios').default;
	
	var args = message.content.slice(prefix.length).trim().split(/ +/g);
	var inscription = {
		'tag_auteur': message.author.tag,
		'id_auteur': message.author.id
	};
	
	message.channel.send(inscription['tag_auteur'] + " " + inscription['id_auteur']);
	/*
	// Test 
	axios({
		method: 'get',
		url: 'http://edh.mtgnantes.fr/Deck/Recuperer/'+liste_MV,
	}).then( function (response) {
		message.channel.send( response.status );
		message.channel.send( response.data.length );
	}).catch( function (error) {
		message.channel.send('Erreur : ' + error );
	});
	//*/
}
