exports.run = (client, message, Discord, prefix) => {
	// Role d'arbitre = 700700174393016330
	message.author.reply("Liste des rôles : "+message.author.roles);
}
