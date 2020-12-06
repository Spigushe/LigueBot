// Deck Registration Command
exports.run = (client, message, Discord, prefix) => {
	// Arguments
	let args = message.content.slice(prefix.length).trim().split(/ +/g);

	// Notify in the proper channel
	message.client.channels.cache
		.get("785278831384723527")
		.send("🎲 Nouveau deck pour <@"+message.author.id+">\n**Decklist** "+args[2]+"\n**hash** "+args[1]);

	if (message.guild !== null) {
		message.delete();
	}
};
