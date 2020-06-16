exports.run = (client, message, Discord, prefix) => {
	// Controle channel d'envoi
	if (message.channel.id !== '693827015610204212') {
		message.reply("This is not the right channel to execute this command\n"+//
					  "-------------\n"+//
					  "Ce n'est pas le bon channel pour lancer cette commande");
		return true;
	}

	// Appel du package axios
	const axios = require('axios').default;

	// Informations de la commande
	var args = message.content.slice(prefix.length).trim().split(/ +/g);

	// Contrôle des données envoyées
	// Contrôle du nombre de segments
	if (args.length !== 4) {
		message.author.send("I am missing some informations to register you, please try again\n"+//
					  "-------------\n"+//
					  "Il manque des informations pour effectuer le changement, veuillez recommencer");
		return false;
	}
	// Contrôle du lien Magic-Ville
	if (!(args[3].match(/magic-ville/gi)) && !(args[3].match(/showdeck/gi))) {
		message.author.send("The link you gave is not a Magic-Ville link\n"+//
					  "-------------\n"+//
					  "Le lien fourni n'est pas un lien vers un deck Magic-Ville");
		return false;
	}

	// Création de la chaine de données pour GET
	let informations =  "&id=" + message.author.id;
	//informations = informations + message.author.tag;
	informations = informations + "&pseudo=" + args[1];
	informations = informations + "&hash=" + args[2];
	informations = informations + "&liste=" + args[3].split("=")[1];

	//Test en local
	//message.reply("mtgnantes/index.php?page=Inscription&action=Ajouter"+informations);

	// Ajout dans la base
	axios.get("http://ligue.spigushe.com/index.php?page=Inscription&action=Ajouter"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.author.send("Your request has encountered an issue:\n"+//
						  "-------------\n"+//
						  "Ta demande a rencontré un problème :\n" + response.data);
			//message.guild.owner.send("Une saisie a rencontré un problème : " + response.data + "\n" + message.content);
		}
		if (response.data.match(/ok/gi)) {
			// Retour OK--id_role_placement
			message.member.roles.add( response.data.split("--")[1] );
			message.author.send("Your registration has been validated\n"+//
						  "-------------\n"+//
						  "Ton inscription a bien été validée");
			message.guild.owner.send("L'utilisateur discord : " + message.author.tag + " s'est inscrit(e) à la ligue !");
			message.guild.members.cache.get('178851989856190464').send("Nouvel inscrit : " + args[1] + "\nListe Magic-Ville : " + args[3]);
		}
	}).catch( function (error) {
		// La connexion à la page a échoué
		message.author.send("Error whilst executing the command :\n"+//
					  "-------------\n"+//
					  "Erreur lors de l'exécution de la commande : \n" + error );
	});
}
