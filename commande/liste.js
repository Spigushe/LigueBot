exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require('axios').default;
	
	// Informations de la commande
	var args = message.content.slice(prefix.length).trim().split(/ +/g);
	
	// Contrôle du nombre de segments
	if (args.length != 2) { 
		message.author.send("il manque des informations pour effectuer l'inscription, veuillez recommencer");
		return false;
	}
	
	// Création de la chaine de données pour GET
	let informations =  "&role=" + args[1];
	
	//Test en local
	message.reply("mtgnantes/index.php?page=Inscription&action=Liste"+informations);
	
	// Ajout dans la base
	//*
	axios.get("http://ligue.mtgnantes.fr/index.php?page=Inscription&action=Liste"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.author.reply("Ta demande a rencontré un problème, un membre du staff viendra vers toi");
		}
		if (response.data.match(/--/gi)) {
			// Retour : pseudo(hash) pseudo(hash) ...
			message.author.reply("Liste des participants de la ligue " + args[1] + " : " + response.data );
		}
	}).catch( function (error) {
		// La connexion à la page a échoué
		message.channel.send('Erreur : ' + error );
	});
	//*/
}