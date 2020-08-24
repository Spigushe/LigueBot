exports.run = (client, message, Discord, prefix) => {
	// Informations de la commande
	var args = message.content.slice(prefix.length).trim().split(/ +/g);

	// !remove id_discord_joueur id_discord_role
	message.guild.members.cache.get(args[1]).roles.remove(args[2]);
};
