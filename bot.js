// Connexion Discord
const Discord = require('discord.js');
const client = new Discord.Client();

// Connexion à la base de données
const sqlite = require('sqlite3');
const database = new sqlite.Database('./database/database.sqlite', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connecté à la base de données.');
});

// Préparation de l'écoute
var prefix = "!";

client.on('ready', () => {
	client.user.setGame('Ranking : Bot 5');
	console.log('I am ready!');
});

client.on('message', message => {    
	if (message.author.bot) return;
	if (message.content.startsWith(prefix)) {
		var args = message.content.slice(prefix.length).trim().split(/ +/g);
		var commande = args.shift().toLowerCase();
		try {
			let fichierCommande = require(`./commande/${commande}.js`);
			fichierCommande.run(client, message, Discord, prefix);
		} catch (err) {
			message.reply("Cette commande n'existe pas");
			console.error(err);
		}
	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
