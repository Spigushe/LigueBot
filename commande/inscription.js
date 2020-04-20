exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require('axios').default;
	
	var args = message.content.slice(prefix.length).trim().split(/ +/g);
	var inscription = {
		'tag_auteur': message.author.tag,
		'id_auteur': message.author.id,
		'pseudo_cockatrice': args[1],
		'hash_cockatrice': args[2],
		'liste_MV': args[3].split("=")[1]
	};
	
	message.channel.send(inscription['tag_auteur'] + " (" + inscription['id_auteur']+") : "+//
			inscription['pseudo_cockatrice']+" deck "+inscription['hash_cockatrice']);
	
	// Test 
	axios({
		method: 'post',
		url: 'http://ligue.mtgnantes.fr/Inscription/Ajouter/',
		data: inscription
	}).then( function (response) {
		message.channel.send( response.status );
		message.channel.send( response.data.length );
		message.channel.send( response.data );
	}).catch( function (error) {
		message.channel.send('Erreur : ' + error );
	});
}
