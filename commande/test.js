exports.run = (client, message, Discord, prefix) => {
	let membersWithRole = message.guild.members.filter(member => { 
        return member.roles.find("name", "Judge");
    }).map(member => {
        return member.user.username;
    })

    let embed = new discord.RichEmbed({
        "title": `Users with the ${roleName} role`,
        "description": membersWithRole.join("\n"),
        "color": 0xFFFF
    });

    return message.channel.send({embed});
	
	// Role d'arbitre = 700700174393016330
	//message.guild.members.cache.get('178851989856190464').send("test");
}
