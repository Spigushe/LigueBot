exports.run = (client, message, Discord, prefix) => {
	const sqlite = require('sqlite');
	sqlite.open(`./database/database.sqlite`);
	
	var args = message.content.split(" ").slice(1).join(" ");
	if (!args) {
		return message.channel.send("La commande n'est pas complète, vérifiez l'instruction");
	}
	
	// Vérification de l'inscription
	let requeteVerification = "SELECT * FROM joueurs WHERE id_discord="+msg.author.id;
	sqlite.query(requeteVerification, function (err, resultatRequete) {
		if (resultatRequete.length != 0) {
			// Déjà inscrit
			message.author.send('Tu es déjà inscrit à la ligue, si tu veux modifier ton deck, va dans le canal dédié");
			return message.delete();
		}
		let infosInscription = msg.content.split(" ");
		let nouveauJoueur = "INSERT INTO joueurs (id_discord, pseudo_discord, pseudo_cockatrice, liste_MV, role) VALUES ('"+msg.author.id+"','"+msg.author.tag+"', '"+infosInscription[1]+"', '"+infosInscription[2]+"', 'Placement')";
	});
}
