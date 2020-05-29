exports.run = (client, message, Discord, prefix) => {
	// Controle channel d'envoi
	if (message.channel.id != '693827015610204212') {
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
	//message.reply("mtgnantes/index.php?page=Inscription&action=Drop"+informations);

	// Ajout dans la base
	//*
	axios.get("http://ligue.mtgnantes.fr/index.php?page=Inscription&action=Drop"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.guild.owner.send(message.author.tag+" a demandé à quitter la ligue. Cette action a rencontré un problème : "+response.data);
			message.author.send("Your request has encountered an issue, a staff member will reach out soon\n"+//
						  "-------------\n"+//
						  "Ta demande a rencontré un problème, un membre du staff viendra vers toi");
		}
		if (response.data.match(/--/gi)) {
			// Retour : pseudo--role--id_role
			message.author.send("Your withdrawal has been taken into account. We wish to see you again soon\n"+//
						  "-------------\n"+//
						  "Ta participation à la ligue a été retirée. Nous souhaitons te revoir au plus vite !");
			message.guild.owner.send("C'est un sombre jour pour la ligue, "+//
				message.author.tag+" est parti.\n"+//
				"Il participait à la ligue "+response.data.split("--")[1]+".\n"+//
				"Son pseudo cockatrice est "+response.data.split("--")[0]);
			message.member.roles.remove(response.data.split("--")[2]);
		}
	}).catch( function (error) {
		// La connexion à la page a échoué
		message.author.send("Error whilst executing the command :\n"+//
					  "-------------\n"+//
					  "Erreur lors de l'exécution de la commande : \n" + error );
	});
	//*/
}
