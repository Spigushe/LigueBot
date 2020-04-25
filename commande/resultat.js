exports.run = (client, message, Discord, prefix) => {
	// Controle channel d'envoi
	if (message.channel.id != '703590887560839183') {
		message.reply("Ce n'est pas le bon channel pour annoncer ses résultats");
		return true;
	}
	
	// Appel du package axios
	const axios = require('axios').default;
	
	// Informations de la commande
	var args = message.content.slice(prefix.length).trim().split(/ +/g);
	
	// Contrôle des données envoyées
		//!resultat joueur_1 resultat_1 - resultat_2 joueur_2
	// Contrôle du nombre de segments
	if (args.length != 6) { 
		message.author.send("il manque des informations pour effectuer l'enregistrement du résultat, veuillez recommencer");
		return false;
	}
	
	// Création de la chaine de données pour GET
	let informations =  "&joueur1=" + args[1];
	informations = informations + "&joueur2=" + args[5];
	informations = informations + "&resultat1=" + args[2];
	informations = informations + "&resultat2=" + args[4];
	
	//Test en local
	//message.reply("mtgnantes/index.php?page=Resultat&action=Ajouter"+informations);
	
	// Ajout dans la base
	//*
	axios.get("http://ligue.mtgnantes.fr/index.php?page=Resultat&action=Ajouter"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.author.send("La saisie du résultat a rencontré un problème : " + response.data);
			//message.guild.owner.send("Une saisie a rencontré un problème : " + response.data + "\n" + message.content);
		}
		if (response.data.match(/ok/gi)) {
			// OK--ligue
			message.author.send("Le résultat a bien été enregistré");
			message.guild.owner.send("Nouveau résultat pour la ligue "+ response.data.split("--")[1] +//
					"\n" + args[1] + "(" + args[2] + ") contre " + args[5] + "(" + args[4] + ")");
		}
	}).catch( function (error) {
		// La connexion à la page a échoué
		message.channel.send('Erreur : ' + error );
	});
	//*/
}