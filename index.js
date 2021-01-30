// Fonctions support
var _clean = function (name) {
	name = name.toLowerCase();
	name = name.replace(/\s|,|\.|-|—|'|:|\(|\)|"|\/|!/g, "");
	name = name.replace(/ö|ó|ô/g, "o");
	name = name.replace(/é|ë|è/g, "e");
	name = name.replace(/œ/g, "oe");
	name = name.replace(/ç/g, "c");
	name = name.replace(/á|ã/g, "a");
	name = name.replace(/í|î/g, "i");
	name = name.replace(/ñ/g, "n");
	name = name.replace(/ü|ú/g, "u");
	return name;
};

var getMacrotype = function (args) {
	// Check if an macrotype has been passed
	for (let i = 0; i < (args.length - 1); i++) {
		if ((args[i] === "-archetype") || (args[i] === "--archetype") || (args[i] === "-macrotype") || (args[i] === "--macrotype")) {
			if (isMacrotype(args[i+1])) {
				return args[i+1];
			} else {
				return "erreur";
			}
		}
	}
	return false;
};
var isMacrotype = function (envoi) {
	var macrotypes = ["agro", "aggro", "tempo", "controle", "combo", "midrange"];
	for (let i = 0; i < macrotypes.length; i++) {
		if (_clean(envoi) === macrotypes[i]) {
			return true;
		}
	}
	return false;
}
var sendMacrotypeInfo = function () {
	let str = "";
	str = "⚠️ **Macrotype inconnu**";
	str = str + "\nLe macrotype que tu as envoyé ne correspond pas aux macrotypes utilisés pour la catégorisation des decks dans cette ligue.";
	str = str + "\nNous nous basons sur le classement **C** disponible sur le Barrin's Codex.";
	str = str + "\nNous t'invitons à contacter un administrateur pour corriger l'information envoyée";
	return str + "\nhttps://barrins-codex.org/fr/articles/lart-de-classifier-les-decks/classification-en-macrotypes.html#5_macrotypes";
}

// Connexion Discord
const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

// Préparation de l'écoute
const prefix = "!";

client.on("ready", () => {});

client.on("message", (message) => {
	// On ne contrôle pas les messages d'un bot
	if (message.author.bot) { return false; }

	// Est-ce que ça commence par un prefix ?
	if (message.content.startsWith(prefix)) {
		var args = message.content.slice(prefix.length).trim().split(/ +/g);
		var commande = args.shift().toLowerCase();

		// 📝 Inscription
		if ((commande === "inscription") || (commande === "register")) {
			// Notify in the proper channel
			message.client.channels.cache
				.get("785278831384723527")
				.send("📝 **Nouvelle inscription** pour <@"+message.author.id+">\nPseudo "+args[0]);
			// Instruct the player to add a deck
			message.author.send("✨ **Merci pour ton inscription**\nTu dois maintenant renseigner le deck avec lequel tu vas jouer. Regarde ce salon pour plus d'information <#698829793470316545>");

			if (message.guild !== null) {
				// Give dedicated role
				//message.member.roles.add("774314371001352233"); // Tournament A
				message.member.roles.add("805194196973649970"); // Tournament B
				// Delete message
				message.delete();
			} else {
				message.client.channels.cache
					.get("785278831384723527")
					.send("🤖 Il faudra ajouter le rôle manuellement pour ce participant");
			}
		}

		// 🎲 Envoi de deck
		if (commande === "deck") {
			//* Registration not possible anymore
			// Vérification de l'archétype
			let macrotype = getMacrotype(args);
			let strMacrotype = "";
			if (macrotype !== false) { // Il y a un macrotype envoyé
				if (macrotype !== "erreur") { // Le macrotype est supporté
					strMacrotype = "\nMacrotype envoyé : " + macrotype;
				} else { // Le macrotype n'existe pas
					message.author.send(sendMacrotypeInfo());
				}
			}
			// Notify in the proper channel
			message.client.channels.cache
				.get("785278831384723527")
				.send("🎲 **Nouveau deck** pour <@"+message.author.id+">\n("+args[0]+") "+args[1]+strMacrotype);
			// Player notice
			message.author.send("✅ **Merci pour ton deck**\n("+args[0]+") "+args[1]+strMacrotype);
			//*/
			/* Registration accepted
			// Rejection messages
			message.author.send("❌ **Fin des envois de deck**\nTu devras jouer avec la dernière version que tu nous as déposée");
			message.client.channels.cache
				.get("785278831384723527")
				.send("❌ **Refus d'un deck** pour <@"+message.author.id+">\n("+args[0]+") "+args[1]);
			//*/
			// Delete message if not in DM
			if (message.guild !== null) { message.delete(); }
		}

		// 🎮 Saisie de résultat
		if ((commande === "resultat") || (commande === "result")) {
			message.author.send("⚔️ **Nouveau résultat**\nTu as envoyé ce résultat : ```"+message.content+"```");
			// Prepare string
			let j1 = args[0];
			let j2 = args[4];
			let r1 = args[1] *1;
			let r2 = args[3] *1;
			if ((r1 === r2) || ((r1+r2) > 3) || ((r1+r2) < 2)) {
				message.author.send("🤔 Ce résultat me semble étrange, pourrais-tu vérifier stp");
				return false;
			}
			if (r1 < r2) { // Change results to always have winner on the left side
				let j0 = 0;	let r0 = 0;
				j0 = j1;	r0 = r1;
				j1 = j2;	r1 = r2;
				j2 = j0;	r2 = r0;
			}
			// Notify in the proper channel
			message.client.channels.cache
				.get("785278831384723527")
				.send("🎮 **Nouveau résultat**\n"+j1+" ("+r1+")  -  "+j2+" ("+r2+")");
			// Delete message if not in DM
			if (message.guild !== null) { message.delete(); }
		}
	}
});

client.login(process.env.BOT_TOKEN);
//BOT_TOKEN is the Client Secret
