exports.run = (client, message, Discord, prefix) => {
	message.guild.members.filter(member => { 
        message.channel.send('arbitre : ' + member.roles.find("id", "700700174393016330"));
    });
	
	// Role d'arbitre = 700700174393016330
	//message.guild.members.cache.get('178851989856190464').send("test");
}
