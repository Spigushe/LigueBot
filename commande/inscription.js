/** Gestion de la date
 * Extention de l'objet Date
 * Affiche AAAAMMJJHHMM
 **/
Date.prototype.maintenant = function() {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();
	var hh = this.getHours();
	var mn = this.getMinutes();

	return [this.getFullYear(),
		(mm>9 ? '' : '0') + mm,
		(dd>9 ? '' : '0') + dd,
		hh,
		mn].join('');
};

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
		let dateInscription = new Date();
		let nouveauJoueur = "INSERT INTO joueurs (id_discord, pseudo_discord, pseudo_cockatrice, liste_MV, role, timestamp) "+
							"VALUES ('"+msg.author.id+"','"+msg.author.tag+"', '"+infosInscription[1]+"', '"+infosInscription[2]+"', 'Placement', '"dateInscription.maintenant()+"')";
		// valider inscription
		// message de suivi d'inscription
	});
}
