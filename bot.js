// Connexion Discord
const Discord = require('discord.js');
const client = new Discord.Client();

// Connexion à la base SQLite
const sqlite3 = require('sqlite3').verbose();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
       message.reply('pong');
       message.author.send("ok bouffon");
       }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
