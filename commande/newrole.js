exports.run = (client, message, Discord, prefix) => {
	// Controle channel d'envoi
	if (message.channel.id != '698073235459276830') {
		message.reply("Ce n'est pas le bon channel pour effectuer les manipulations du staff");
		return true;
	}
	
	// Appel du package axios
	const axios = require('axios').default;
	
	// Informations de la commande
	var args = message.content.slice(prefix.length).trim().split(/ +/g);
	
	// Contrôle des données envoyées
	// Contrôle du nombre de segments
	if (args.length != 3) { 
		message.author.send("il manque des informations pour ajouter un nouveau role, veuillez recommencer");
		return false;
	}
	
	// Création de la chaine de données pour GET
	let informations =  "&nom=" + args[1];
	informations = informations + "&id_discord=" + args[2];
	
	//Test en local
	//message.reply("mtgnantes/index.php?page=Role&action=Ajouter"+informations);
	
	// Ajout dans la base
	//*
	axios.get("http://ligue.mtgnantes.fr/index.php?page=Role&action=Ajouter"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.author.send("La création d'un nouveau rôle a rencontré un problème : " + response.data);
			//message.guild.owner.send("Une saisie a rencontré un problème : " + response.data + "\n" + message.content);
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