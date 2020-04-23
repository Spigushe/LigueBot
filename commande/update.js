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
		// Recherche des informations pour update
		axios.get("http://ligue.mtgnantes.fr/index.php?page=Role&action=Attribuer&role="+args[1]+"&pseudo="+args[i])
		.then( function (response) {
			// La connexion à la page a réussi
			if (response.data.match(/erreur/gi)) {
				message.author.send("L'update de "+args[i]+" a rencontré un problème : " + response.data);
			}
			if (response.data.match(/--/gi)) {
				infos = response.data.split("--");
				if (message.guild.members.cache.get(infos[0]) !== undefined) {
					message.guild.members.cache.get(infos[0]).roles.remove(infos[1]);
					message.guild.members.cache.get(infos[0]).roles.add(infos[2]);
					message.author.send("L'ajout du nouveau rôle est fait pour "+args[i]);
				}
			}
		}).catch( function (error) {
			// La connexion à la page a échoué
			message.channel.send('Erreur : ' + error );
		});
	}
}