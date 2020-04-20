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
	
	if (verif(message)) {
		message.channel.send('conditions OK');
	} else {
		message.channel.send('conditions KO');	
	}
	
	// Test 
	axios({
		method: 'post',
		url: 'http://ligue.mtgnantes.fr/Inscription/Ajouter/',
		data: inscription
	}).then( function (response) {
		message.channel.send( response.data );
	}).catch( function (error) {
		message.channel.send('Erreur : ' + error );
	});
}

var verif = function (message) {
	let args = message.content.slice(prefix.length).trim().split(/ +/g);
	
	if (args.length != 4) return false;
	if (!isValidURL(args[3])) {
		message.reply("il ne s'agit pas d'un lien vers Magic-Ville");
		return false;
	}
	return true;
}

var isValidURL = function (url) {
	// Appel du package axios
	const axios = require('axios').default;
	
	// On regarde si on arrive à se connecter
	axios.get(url)
	.then( function (response) {
		return true;
	}).catch( function (error) {
		return false;
	});
}