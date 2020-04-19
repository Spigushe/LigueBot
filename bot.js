// Connexion Discord
const Discord = require('discord.js');
const client = new Discord.Client();

/*
// Connexion à la base de données
const sqlite = require('sqlite3');
sqlite.open(`./database/database.sqlite`);
//*/

// Préparation de l'écoute
var prefix = "!";

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
