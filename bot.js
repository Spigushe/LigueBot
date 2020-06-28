// Connexion Discord
const Discord = require("discord.js");
const client = new Discord.Client();

// Préparation de l'écoute
var prefix = "!";

client.on("ready", () => {});

client.on("message", (message) => {
	// On ne contrôle pas les messages d'un bot
	if (message.author.bot) {
		return;
	}
	// Est-ce que ça commence par un prefix ?
	if (message.content.startsWith(prefix)) {
		var commande = message.content.slice(prefix.length).trim().split(/ +/g)
		commande = commande.shift().toLowerCase();
		message.author.reply(commande);

		if ((commande === "inscription") || (commande === "register")) {
			require("./function/register.js").run(client, message, Discord, prefix);
			message.delete();
			return;
		}

		if (commande === "deck") {
			require("./function/deck.js").run(client, message, Discord, prefix);
			message.delete();
			return;
		}

		if (commande === "pause") {
			require("./function/pause.js").run(client, message, Discord, prefix);
			message.delete();
			return;
		}

		if (commande === "drop") {
			require("./function/drop.js").run(client, message, Discord, prefix);
			message.delete();
			return;
		}

		if ((commande === "result") || (commande === "resultat")) {
			require("./function/result.js").run(client, message, Discord, prefix);
			message.delete();
			return;
		}

		/************************/
		/************************/
		/***                  ***/
		/***  COMMANDES ORGA  ***/
		/***                  ***/
		/************************/
		/************************/
		if (commande === "liste") {
			require("./function/liste.js").run(client, message, Discord, prefix);
			message.delete();
			return;
		}

		if (commande === "update") {
			require("./function/leagues.js").run(client, message, Discord, prefix);
			message.delete();
			return;
		}

		if (commande === "newrole") {
			require("./function/newrole.js").run(client, message, Discord, prefix);
			message.delete();
			return;
		}
	}
});

client.login(process.env.BOT_TOKEN);
//BOT_TOKEN is the Client Secret
