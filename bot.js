// Connexion Discord
const Discord = require('discord.js');
const client = new Discord.Client();

// Connexion à la base de données
//const mysql = require('mysql');

// Préparation de l'écoute
//var prefix = "!";

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
        message.author.send("ok bouffon");
        return;
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
