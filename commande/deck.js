exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require('axios').default;
	
	// Informations de la commande
	var args = message.content.slice(prefix.length).trim().split(/ +/g);
	
	// Contrôle des données envoyées
	// Contrôle du nombre de segments
	if (args.length != 3) { 
		message.author.send("il manque des informations pour effectuer l'inscription, veuillez recommencer");
		return false;
	}
	// Contrôle du lien Magic-Ville
	if (!(args[2].match(/magic-ville/gi)) && !(args[2].match(/showdeck/gi))) {
		message.author.send("le lien fourni n'est pas un lien vers un deck Magic-Ville");
		return false;
	}
	
	// Création de la chaine de données pour GET
	let informations =  "&id=" + message.author.id;
	informations = informations + "&hash=" + args[1];
	informations = informations + "&liste=" + args[2].split("=")[1];
	
	// Ajout dans la base
	//message.guild.owner.send("http://ligue.mtgnantes.fr/index.php?page=Inscription&action=Changer"+informations);
	axios.get("http://ligue.mtgnantes.fr/index.php?page=Inscription&action=Changer"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.author.send("Ton changement de deck a rencontré un problème : " + response.data);
		}
		if (response.data.match(/ok/gi)) {
			message.author.send("Ton changement de deck a bien été validé");
		}
	}).catch( function (error) {
		// La connexion à la page a échoué
		message.channel.send('Erreur : ' + error );
	});
}
