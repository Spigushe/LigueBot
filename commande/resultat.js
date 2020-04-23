exports.run = (client, message, Discord, prefix) => {
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
	
	// Ajout dans la base
	axios.get("http://ligue.mtgnantes.fr/index.php?page=Resultat&action=Ajouter"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.author.send("Ton inscription a rencontré un problème : " + response.data);
		}
		if (response.data.match(/ok/gi)) {
			message.author.send("Ton inscription a bien été validée");
			message.guild.owner.send("L'utilisateur discord : " + message.author.tag + " s'est inscrit(e) à la ligue !");
		}
	}).catch( function (error) {
		// La connexion à la page a échoué
		message.channel.send('Erreur : ' + error );
	});
}
