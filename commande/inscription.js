exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require('axios').default;
	
	// Informations de la commande
	var args = message.content.slice(prefix.length).trim().split(/ +/g);
	
	// Contrôle des données envoyées
	// Contrôle du nombre de segments
	if (args.length != 4) { 
		message.author.send("il manque des informations pour effectuer l'inscription, veuillez recommencer");
		return false;
	}
	// Contrôle du lien Magic-Ville
	if (!(args[3].match(/magic-ville/gi)) && !(args[3].match(/showdeck/gi))) {
		message.author.send("le lien fourni n'est pas un lien vers un deck Magic-Ville");
		return false;
	}
	
	// Ajout dans la base
	axios({
		method: 'post',
		url: 'http://ligue.mtgnantes.fr/Inscription/Ajouter/',
		data: {
			'tag_auteur': message.author.tag,
			//'id_auteur' : message.author.id,
			//'pseudo'    : args[1],
			//'hash'      : args[2],
			//'liste_MV'  : args[3].split("=")[1]
		}
	}).then( function (response) {
		message.channel.send( response.data );
		message.author.send("Ton inscription a été prise en compte. "+//
			"Si tu souhaites modifier ton deck avant la date limite d'inscription, le #deck-changer est pour toi !");
	}).catch( function (error) {
		message.channel.send('Erreur : ' + error );
	});
}
