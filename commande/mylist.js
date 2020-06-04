exports.run = (client, message, Discord, prefix) => {
	// Controle channel d'envoi
	/*
    if (message.channel.id != '702453593328058389') {
		message.reply("Ce n'est pas le bon channel pour cette commande");
		return true;
	}
    //*/

	// Appel du package axios
	const axios = require('axios').default;

	// Contrôle des données envoyées
	// Seul le message !giveup est demandé

	// Création de la chaine de données pour GET
	let informations =  "&id=" + message.author.id;

	//Test en local
	//message.author.send("mtgnantes/index.php?page=Inscription&action=Retrieve"+informations);

	// Ajout dans la base
	//*
	axios.get("http://ligue.spigushe.com/index.php?page=Inscription&action=Retrieve"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.author.send("Ta demande a rencontré un problème, nous t'invitons à réessayer");
		} else {
            var msg = "Voici votre liste enregistrée / You can find your current list here \n"+//
			         response.data;
            message.author.send(msg);
		}
	}).catch( function (error) {
		// La connexion à la page a échoué
		message.author.send("Error whilst executing the command :\n"+//
					  "-------------\n"+//
					  "Erreur lors de l'exécution de la commande : \n" + error );
	});
	//*/
}
