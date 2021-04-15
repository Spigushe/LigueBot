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
	return str + "\nhttps://barrins-codex.org/fr/articles/classifier-un-deck/les-macrotypes.html#5_macrotypes";
}

var commandZone = new Array(
	"Akiri, Line-Slinger - Baral, Chief of Compliance",
	"Arahbo, Roar of the World - Breya, Etherium Shaper",
	"Edgar Markov - Derevi, Empyrial Tactician",
	"Reyhan, Last of the Abzan - Ludevic, Necro-Alchemist",
	"Najeela, the Blade-Blossom - Omnath, Locus of Creation",
	"Geist of Saint Traft - Oloro, Ageless Ascetic",
	"Edric, Spymaster of Trest - Krark, the Thumbless",
	"Tymna the Weaver - Thrasios, Triton Hero",
	"Zurgo Bellstriker - Emry, Lurker of the Loch",
	"Keleth, Sunmane Familiar - Prime Speaker Vannifar",
	"Yuriko, the Tiger's Shadow - Esior, Wardwing Familiar",
	"Jeska, Thrice Reborn - Tasigur, the Golden Fang",
	"Marath, Will of the Wild - Teferi, Temporal Archmage",
	"Vial Smasher the Fierce - Urza, Lord High Artificer",
	"Ludevic, Necro-Alchemist - Krark, the Thumbless",
	"Baral, Chief of Compliance - Prime Speaker Vannifar",
	"Tasigur, the Golden Fang - Thrasios, Triton Hero",
	"Omnath, Locus of Creation - Derevi, Empyrial Tactician",
	"Breya, Etherium Shaper - Emry, Lurker of the Loch",
	"Urza, Lord High Artificer - Teferi, Temporal Archmage",
	"Ardenn, Intrepid Archaeologist - Esior, Wardwing Familiar",
	"Bruse Tarl, Boorish Herder - Oloro, Ageless Ascetic",
	"Rofellos, Llanowar Emissary - Rograkh, Son of Rohgahh",
	"Keleth, Sunmane Familiar - Oloro, Ageless Ascetic",
);

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
			/* Registration open
			// Notify in the proper channel
			message.client.channels.cache
				.get("827908068960501760")
				.send("📝 **Nouvelle inscription** pour <@"+message.author.id+">\nPseudo "+args[0]);

			let str = ""; // Prepare the bot's message to the player
			if (commande === "inscription") { // FR
				str = str + "✨ **Merci pour ta pré-inscription**\n";
				str = str + "Tu dois maintenant renseigner le deck avec lequel tu vas jouer pour valider ton inscription.\n";
				str = str + "Regarde ce salon pour plus d'information <#698829793470316545>";
			}
			if (commande === "register") { // EN
				str = str + "✨ **Thank you for you pre-registration**\n";
				str = str + "You must now enter the deck you are going to play with to confirm your registration.\n";
				str = str + "Go to this channel for more information <#698829793470316545>";
			}

			message.author.send(str);

			// Tournoi fun
			/*
			let pos = Math.floor(Math.random() * commandZone.length);
			let cz = commandZone.splice(pos, 1); // Retrait
			// Retour du bot
			str = "🤖 **Bip, Boup**\nI assigned you those two commanders:```";
			str = str + cz;
			str = str + "```Please do not tell anyone about the two I've given you! 🤐"
			message.author.send(str);
			//*/
			/*
			// Info orga
			message.client.channels.cache
				.get("827908068960501760")
				.send("😂 I've given `"+cz+"` to <@"+message.author.id+">");

			if (message.guild !== null) {
				// Give dedicated role
				//message.member.roles.add("774314371001352233"); // Tournament A
				//message.member.roles.add("805194196973649970"); // Tournament B
				message.member.roles.add("810990493767827496"); // Tournament C
				// Delete message
				message.delete();
			} else {
				message.client.channels.cache
					.get("827908068960501760")
					.send("🤖 Il faudra ajouter le rôle manuellement pour ce participant");
			}
			//*/
			//* Registration closed
			// Rejection messages
			message.author.send("❌ **Fin des inscriptions**\nNous te donnons rendez-vous pour notre prochain tournoi");
			message.client.channels.cache
				.get("827908068960501760")
				.send("❌ **Refus d'une inscription** pour <@"+message.author.id+"> ("+args[0]+") ");
			//*/
		}

		// 🎲 Envoi de deck
		if (commande === "deck") {
			//* Registration accepted
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
				.get("827908068960501760")
				.send("🎲 **Nouveau deck** pour <@"+message.author.id+">\n("+args[0]+") "+args[1]+strMacrotype);
			// Player notice
			message.author.send("✅ **Merci pour ton deck**\n("+args[0]+") "+args[1]+strMacrotype);
			//*/
			/* Registration closed
			// Rejection messages
			message.author.send("❌ **Fin des envois de deck**\nTu devras jouer avec la dernière version que tu nous as déposée");
			message.client.channels.cache
				.get("827908068960501760")
				.send("❌ **Refus d'un deck** pour <@"+message.author.id+">\n("+args[0]+") "+args[1]);
			//*/
			// Delete message if not in DM
			if (message.guild !== null) { message.delete(); }
		}

		// 🎮 Saisie de résultat
		if ((commande === "resultat") || (commande === "result")) {
			message.author.send("⚔️ **Nouveau résultat**\nTu as envoyé ce résultat : ```"+message.content+"```");
			// Prepare string
			let j1 = args[0];		let j2 = args[4];
			let r1 = args[1] * 1;	let r2 = args[3] * 1;
			if ((r1 === r2) || ((r1+r2) > 3) || ((r1+r2) < 2)) {
				message.author.send("🤔 Ce résultat me semble étrange, pourrais-tu vérifier stp");
				return false;
			}
			let str = "🎮 **Nouveau résultat**\n";
			if (r1 < r2) { // Change results to always have winner on the left side
				str = str + j2 + " (" + r2 + ")  -  " + j1 + " (" + r1 + ")";
			} else {
				str = str + j1 + " (" + r1 + ")  -  " + j2 + " (" + r2 + ")";
			}
			if (message.guild !== null) {
				str = str + "\nMessage envoyé depuis <#" + message.channel.id + ">";
			} else {
				str = str + "\nMessage envoyé en MP au bot";
			}
			str = str + "\n*Contenu du message* : `" + message.content + "`";
			// Notify in the proper channel
			message.client.channels.cache
				.get("827908068960501760")
				.send(str);
			// Delete message if not in DM
			if (message.guild !== null) { message.delete(); }
		}
	}
});

client.login(process.env.BOT_TOKEN);
//BOT_TOKEN is the Client Secret
