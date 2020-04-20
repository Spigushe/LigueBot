exports.run = (client, message, Discord, prefix) => {
	message.reply("On amorce le processus d'inscription.");
	
	// Connexion à la base de données
	const sqlite = require("sqlite3").verbose();
	
	// open database in memory
	let db = new sqlite3.Database(':memory:', (err) => {
		if (err) { return console.error(err.message); }
		console.log('Connected to the in-memory SQlite database.');
		message.channel.send("Connecté à la base de données");
	});
	
	// close the database connection
	db.close((err) => {
		if (err) { return console.error(err.message); }
		console.log('Close the database connection.');
		message.channel.send("Connexion à la base de données fermée");
	});
}
