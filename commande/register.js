// Registration Command
exports.run = (client, message, Discord, prefix) => {
	// Channel Control
	if (message.channel.id !== "693827015610204212") {
		message.reply("This is not the right channel to execute this command, please go to <#693827015610204212>");
		return true;
	}

	// Notify in the proper channel
	message.reply("test");
	client.channels.cache.get("785259925143420949").send("coucou");
	message.reply("test");
};
