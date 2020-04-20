exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require('axios').default;
	
	// Informations de la commande
	var args = message.content.slice(prefix.length).trim().split(/ +/g);
	
	// Contrôle des données envoyées
	if (args.length != 4) { // Contrôle du nombre de segments
		message.reply("il manque des informations pour effectuer l'inscription, veuillez recommencer");	
		return false;
	}
	
	//Données pour inscription
	var inscription = {
		'tag_auteur': message.author.tag,
		'id_auteur': message.author.id,
		'pseudo_cockatrice': args[1],
		'hash_cockatrice': args[2],
		'liste_MV': args[3].split("=")[1]
	};
	
	message.channel.send(inscription['tag_auteur'] + " (" + inscription['id_auteur']+") : "+//
			inscription['pseudo_cockatrice']+" deck "+inscription['hash_cockatrice']);
	
	// Ajout dans la base
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
