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
	
	// Création de la chaine de données pour GET
	let information = information + "&id=" + message.author.id;
	information = information + "&pseudo=" + args[1];
	information = information + "&hash=" + args[2];
	information = information + "&liste" + args[3].split("=")[1];
	
	message.author.send("page=Inscription&action=Ajouter"+informations);
	
	// Ajout dans la base
	axios.get("http://ligue.mtgnantes.fr/index.php?page=Inscription&action=Ajouter"+informations)
	.then( function (response) {
		message.channel.send( response.data );
	}).catch( function (error) {
		message.channel.send('Erreur : ' + error );
	});
}
