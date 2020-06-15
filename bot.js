// Connexion Discord
const Discord = require('discord.js');
const client = new Discord.Client();

// Préparation de l'écoute
var prefix = "!";

client.on('ready', () => {});

client.on('message', message => {
	if (message.author.bot) return;
	if (message.content.startsWith(prefix)) {
		var args = message.content.slice(prefix.length).trim().split(/ +/g);
		var commande = args.shift().toLowerCase();

		var commandes_judgebot = ['card','price','ruling','rule','legal','hangman','standard','cr','ipg','mtr','jar','help'];
		for (let i = 0; i < commandes_judgebot.length; i++) {
			if (commande === commandes_judgebot[i]) {
				return false;
			}
		}

		try {
			let fichierCommande = require(`./commande/${commande}.js`);
			fichierCommande.run(client, message, Discord, prefix);
		} catch (err) {
			message.author.send("Cette commande n'existe pas");
		}
		message.delete();
	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
//BOT_TOKEN is the Client Secret
