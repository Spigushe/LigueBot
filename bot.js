// Connexion Discord
const Discord = require("discord.js");
const client = new Discord.Client();
require('dotenv').config();

// Préparation de l'écoute
const prefix = "!";

client.on("ready", () => {});

client.on("message", (message, client, Discord) => {
	console.log(message.content);

	// On ne contrôle pas les messages d'un bot
	if (message.author.bot) { return false; }

	// Est-ce que ça commence par un prefix ?
	if (message.content.startsWith(prefix)) {
		var args = message.content.slice(prefix.length).trim().split(/ +/g);
		var commande = args.shift().toLowerCase();

		// Check commands
		if ((commande === "inscription") || (commande === "register")) {
			let chemin = "./commande/register.js";
			let fichierCommande = require(chemin);
			fichierCommande.run(client, message, Discord, prefix);
			message.delete();
		}
	}
});

client.login(process.env.BOT_TOKEN);
//BOT_TOKEN is the Client Secret
