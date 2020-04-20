// Connexion Discord
const Discord = require('discord.js');
const client = new Discord.Client();

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
	message.delete();
	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
//BOT_TOKEN is the Client Secret
