exports.run = (client, message, Discord, prefix) => {
	// Controle channel d'envoi
	if (message.channel.id != '702453593328058389') {
		message.reply("This is not the right channel to execute this command\n"+//
					  "-------------\n"+//
					  "Ce n'est pas le bon channel pour lancer cette commande");
		return true;
	}

	// Appel du package axios
	const axios = require('axios').default;

	// Contrôle des données envoyées
	// Seul le message !giveup est demandé

	// Création de la chaine de données pour GET
	let informations =  "&id=" + message.author.id;

	//Test en local
	//message.reply("mtgnantes/index.php?page=Inscription&action=GiveUp"+informations);

	// Ajout dans la base
	//*
	axios.get("http://ligue.spigushe.com/index.php?page=Inscription&action=GiveUp"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.guild.owner.send(message.author.tag+" a demandé sa mise en pause. Cette action a rencontré un problème : \n"+//
						  response.data);
			message.author.send("Your request has encountered an issue, a staff member will reach out soon\n"+//
						  "-------------\n"+//
						  "Ta demande a rencontré un problème, un membre du staff viendra vers toi");
		}
		if (response.data.match(/--/gi)) {
			// Retour : pseudo--role
			message.author.send("Your pause has been taken into account. We will wait for you next season\n"+//
						  "-------------\n"+//
						  "Votre participation à la ligue a été mise en pause pour le mois en cours");
			message.guild.owner.send(message.author.tag+" a mis en pause sa participation.\n"+//
				"Il participait à la ligue "+response.data.split("--")[1]+".\n"+//
				"Son pseudo cockatrice est "+response.data.split("--")[0]);
		}
	}).catch( function (error) {
		// La connexion à la page a échoué
		message.author.send("Error whilst executing the command :\n"+//
					  "-------------\n"+//
					  "Erreur lors de l'exécution de la commande : \n" + error );
	});
	//*/
}
