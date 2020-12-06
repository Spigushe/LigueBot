// League Registration Command
exports.run = (client, message, Discord, prefix) => {
	// Channel Control
	if (message.channel.id !== "693827015610204212") {
		message.reply("This is not the right channel to execute this command, please go to <#693827015610204212>");
		return true;
	}

	// Cockatrice nickname
	let nickname = message.content.slice(prefix.length).trim().split(/ +/g)[1];

	// Notify in the proper channel
	message.client.channels.cache
		.get("785278831384723527")
		.send("📝 Inscription de <@"+message.author.id+">\n**Pseudo** "+nickname);

	if (message.guild !== null) {
		message.delete();
	}
};
