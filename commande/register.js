// League Registration Command
exports.run = (client, message, Discord, prefix) => {
	// Cockatrice nickname
	let nickname = message.content.slice(prefix.length).trim().split(/ +/g)[1];

	// Notify in the proper channel
	message.client.channels.cache
		.get("785278831384723527")
		.send("📝 Inscription de <@"+message.author.id+">\n**Pseudo** "+nickname);

	// Give dedicated role
	message.member.roles.add("774314371001352233");

	if (message.guild !== null) {
		message.delete();
	}
};
