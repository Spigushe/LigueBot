exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require('axios').default;
	
	// Informations de la commande
	var args = message.content.slice(prefix.length).trim().split(/ +/g);
	
	// Contrôle des données envoyées
	// Contrôle du nombre de segments
	if (args.length < 3) { 
		message.author.send("il manque des informations pour effectuer l'update, veuillez recommencer");
		return false;
	}
	
	for (let i = 2; i < args.length; i++) {
		message.reply("mtgnantes/index.php?page=Role&action=Retirer&pseudo="+args[i]);
		message.reply("mtgnantes/index.php?page=Role&action=Attribuer&role="+args[1]+"&pseudo="+args[i]);
	}
	/*
	// Création de la chaine de données pour GET
	let informations =  "&nom=" + args[1];
	informations = informations + "&id_discord=" + args[2];
	//*/
	
	// Ajout dans la base
	/*
	axios.get("http://ligue.mtgnantes.fr/index.php?page=Role&action=Ajouter"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.author.send("La création d'un nouveau rôle a rencontré un problème : " + response.data);
		}
		if (response.data.match(/ok/gi)) {
			message.author.send("L'ajout du nouveau rôle est fait");
		}
	}).catch( function (error) {
		// La connexion à la page a échoué
		message.channel.send('Erreur : ' + error );
	});
	//*/
}
