exports.run = (client, message, Discord, prefix) => {
	// Controle channel d'envoi
	if (message.channel.id !== "698073235459276830") {
		message.reply("This is not the right channel to execute this command\n-------------\nCe n'est pas le bon channel pour lancer cette commande");
		return true;
	}

	// Appel du package axios
	const axios = require("axios").default;

	// Informations de la commande
	var args = message.content.slice(prefix.length).trim().split(/ +/g);

	// Contrôle des données envoyées
	// Contrôle du nombre de segments
	if (args.length < 3) {
		message.author.send("Il manque des informations pour effectuer l'update, veuillez recommencer");
		return false;
	}

	args.forEach(function(item, index, array) {
		// Si l'index n'est pas un pseudo, on passe
		if (index <= 1) { return; }

		// Préparation des informations
		let informations = "&role=" + args[1] + "&pseudo=" + item;

		// Ajout dans la base
		axios.get("http://ligue.spigushe.com/index.php?page=Role&action=Attribuer"+informations)
		.then( function (response) {
			// La connexion à la page a réussi
			if (response.data.match(/erreur/gi)) {
				message.author.send("L'update de "+item+" a rencontré un problème : " + response.data);
			}
			if (response.data.match(/--/gi)) {
				let infos = response.data.split("--");
				if (message.guild.members.cache.get(infos[0]) !== "undefined") {
					message.guild.members.cache.get(infos[0]).roles.remove(infos[1]);
					message.guild.members.cache.get(infos[0]).roles.add(infos[2]);
					message.guild.owner.send("L'ajout du nouveau rôle est fait pour "+item);
					message.guild.members.cache.get("178851989856190464").send("L'ajout du nouveau rôle est fait pour "+item);
				}
			}
		}).catch( function (error) {
			// La connexion à la page a échoué
			message.author.send("Error whilst executing the command :\n-------------\nErreur lors de l'exécution de la commande : \n" + error );
		});
	});
};
