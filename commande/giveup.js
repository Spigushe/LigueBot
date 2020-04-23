exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require('axios').default;
	
	// Contrôle des données envoyées
	// Seul le message !giveup est demandé
	
	// Création de la chaine de données pour GET
	let informations =  "&id_discord=" + message.author.id;
	
	// Ajout dans la base
	axios.get("http://ligue.mtgnantes.fr/index.php?page=Inscription&action=GiveUp"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.guild.owner.send(message.author.tag+" a demandé sa mise en pause. Celle-ci a rencontré un problème : "+response.data);
		}
		if (response.data.match(/--/gi)) {
			// Retour : pseudo--role
			message.author.send("Votre participation à la ligue a été mise en pause pour le mois en cours");
			message.guild.owner.send(message.author.tag+" a mis en pause sa participation.\n"+//
				"Il participait à la ligue "+response.data.split("--")[1]+".\n"+//
				"Son pseudo cockatrice est "+response.data.split("--")[0]);
		}
	}).catch( function (error) {
		// La connexion à la page a échoué
		message.channel.send('Erreur : ' + error );
	});
}