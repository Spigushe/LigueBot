exports.run = (client, message, Discord, prefix) => {
	// Controle channel d'envoi
	if (message.channel.id != '698073235459276830') {
		return false;
	}
	
	const exampleEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Details of '+message.author.tag)
		.setURL('http://ligue.spigushe.com/')
		.setAuthor('LigueBot', 'http://ligue.spigushe.com/Afficher/CSS/Images/Logo.png', 'http://ligue.spigushe.com/')
		.setDescription('How '+message.author.tag+' is currently faring in the league')
		.setThumbnail('http://ligue.spigushe.com/Afficher/CSS/Images/Logo.png')
		.addFields(
			{ name: 'General Details', value: 'Commander name, Cockatrice Name, Deck hash' },
			{ name: 'Elo ranking', value: 'League, elo points' },
			//{ name: '\u200B', value: '\u200B' },
			{ name: 'Game History', value: 'last opponent', inline: true },
			{ name: 'Game History', value: 'opponent before', inline: true },
			{ name: 'Game History', value: 'opponent before before', inline: true },
		)
		//.setImage('http://ligue.spigushe.com/Afficher/CSS/Images/Logo.png')
		.setTimestamp()
		.setFooter('Commander League', 'http://ligue.spigushe.com/Afficher/CSS/Images/Logo.png');

	message.channel.send(exampleEmbed);
}
