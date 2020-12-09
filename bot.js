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
			// Give dedicated role
			message.member.roles.add("774314371001352233");
			// Delete message if not in DM
			if (message.guild !== null) { message.delete(); }
		}

		// 🎲 Envoi de deck
		if (commande === "deck") {
			// Notify in the proper channel
			message.client.channels.cache
				.get("785278831384723527")
				.send("🎲 **Nouveau deck** pour <@"+message.author.id+">\n("+args[0]+") "+args[1]);
			// Delete message if not in DM
			if (message.guild !== null) { message.delete(); }
		}

		// 🎮 Saisie de résultat
		if ((commande === "resultat") || (commande === "result")) {
			message.author.send("You sent the following results : ```"+message.content+"```");
			// Prepare string
			let j1 = args[0];
			let j2 = args[4];
			let r1 = args[1] *1;
			let r2 = args[3] *1;
			if ((r1 === r2) || ((r1+r2) > 3) || ((r1+r2) < 2)) {
				message.author.send("The results does not seem correct, please re-send them");
				return false;
			}
			if (r1 < r2) {
				let j0 = r0 = 0;
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
