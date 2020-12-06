// Registration Command

exports.run = (client, message, Discord, prefix) => {
	// Channel Control
	if (message.channel.id !== "693827015610204212") {
		message.reply("This is not the right channel to execute this command, please go to <#693827015610204212>");
		return true;
	}

	// Data : People are expected to specifiy their Cockatrice nickname
	let nick = message.content.slice(prefix.length).trim().split(/ +/g)[1];

	// Notify in the proper channel
	let channel_id = "785259925143420949";
	let channel = client.channels.find(channel => channel.id === "785259925143420949");

	channel.send("coucou");

};
