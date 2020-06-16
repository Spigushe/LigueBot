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
		var args = message.content.slice(prefix.length).trim().split(/ +/g);
		var commande = args.shift().toLowerCase();
		
		// Conflit avec JudgeBot
		var judgebot = ["card","price","ruling","rule","legal","hangman","standard","cr","ipg","mtr","jar","help"];
		for (let i = 0; i < judgebot.length; i++) {
			if (commande === judgebot[i]) {
				return false;
			}
		}

		// On exécute la commande
		try {
			let fichierCommande = require("./commande/"+commande+".js");
			fichierCommande.run(client, message, Discord, prefix);
		} catch (err) {
			message.author.send("Cette commande n'existe pas");
		}
		message.delete();
	}
});

client.login(process.env.BOT_TOKEN);
//BOT_TOKEN is the Client Secret
