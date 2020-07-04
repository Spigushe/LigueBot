exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require("axios").default;

	// Update bloquée
	message.author.send("Deck update is no longer possible for this season, please reach a staff member if you have any problem\nLe changement de deck n'est plus possible pour cette saison, contactez un membre du staff si vous avez un problème");
	return;
	
	// Informations de la commande
	var args = message.content.slice(prefix.length).trim().split(/ +/g);

	// Contrôle des données envoyées
	// Contrôle du nombre de segments
	if (args.length !== 3) {
		message.author.send("I am missing some informations to update your deck, please try again\nIl manque des informations pour effectuer le changement, veuillez recommencer");
		return false;
	}
	// Contrôle du lien Magic-Ville
	if (!(args[2].match(/magic-ville/gi)) && !(args[2].match(/showdeck/gi))) {
		message.author.send("The link you gave is not a Magic-Ville link\nLe lien fourni n'est pas un lien vers un deck Magic-Ville");
		return false;
	}

	// Création de la chaine de données pour GET
	let informations =  "&id=" + message.author.id + "&hash=" + args[1] + "&liste=" + args[2].split("=")[1];

	// Ajout dans la base
	axios.get("http://ligue.spigushe.com/index.php?page=Deck&action=Ajouter"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.author.send("Your deck-updating has encountered an issue :\nTon changement de deck a rencontré un problème : \n" + response.data);
		}
		if (response.data.match(/ok/gi)) {
			message.author.send("Your deck-updating has been validated\nTon changement de deck a bien été validé");
		}
	}).catch( function (error) {
		// La connexion à la page a échoué
		message.author.send("Error whilst executing the command :\nErreur lors de l'exécution de la commande : \n" + error );
	});
};
