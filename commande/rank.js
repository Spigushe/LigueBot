exports.run = (client, message, Discord, prefix) => {
	// Controle channel d'envoi
	if (message.channel.id != '698073235459276830') {
		return false;
	}
	
	const exampleEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Discord User')
		//.setURL('https://discord.js.org/')
		.setAuthor('LigueBot', 'http://ligue.spigushe.com/Afficher/CSS/Images/Logo.png', 'http://ligue.spigushe.com/')
		.setDescription('Details of %Discord User%')
		.setThumbnail('http://ligue.spigushe.com/Afficher/CSS/Images/Logo.png')
		.addFields(
			{ name: 'General Details', value: 'Commander name, Cockatrice Name, Deck hash' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Previous game', value: 'last opponent', inline: true },
			{ name: '', value: 'opponent before', inline: true },
			{ name: '', value: 'opponent before before', inline: true },
		)
		.setImage('http://ligue.spigushe.com/Afficher/CSS/Images/Logo.png')
		.setTimestamp()
		.setFooter('Commander League', 'http://ligue.spigushe.com/Afficher/CSS/Images/Logo.png');

	message.channel.send(exampleEmbed);
}
