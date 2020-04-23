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
	let informations =  "&id=" + message.author.id;
	informations = informations + "&pseudo=" + args[1];
	informations = informations + "&hash=" + args[2];
	informations = informations + "&liste=" + args[3].split("=")[1];
	
	//Test en local
	//message.reply("mtgnantes/index.php?page=Inscription&action=Ajouter"+informations);
	
	// Ajout dans la base
	//*
	axios.get("http://ligue.mtgnantes.fr/index.php?page=Inscription&action=Ajouter"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.author.send("Ton inscription a rencontré un problème : " + response.data);
		}
		if (response.data.match(/ok/gi)) {
			// Retour OK--id_role_placement
			message.author.send("Ton inscription a bien été validée");
			message.reply( response.data );
			message.author.roles.add( response.data.split("--")[1] );
			message.guild.owner.send("L'utilisateur discord : " + message.author.tag + " s'est inscrit(e) à la ligue !");
		}
	}).catch( function (error) {
		// La connexion à la page a échoué
		message.channel.send('Erreur : ' + error );
	});
	//*/
}