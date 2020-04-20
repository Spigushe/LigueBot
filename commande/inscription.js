exports.run = (client, message, Discord, prefix) => {
	message.reply("On amorce le processus d'inscription.");
	
	// Connexion à la base de données
	const sqlite = require("sqlite3").verbose();
	
	// Ouverture de la base de données
	let db = new sqlite.Database('http://ligue.mtgnantes.fr/db/database.sqlite', (err) => {
		if (err) { return console.error(err.message); }
		console.log('Connected to the in-memory SQlite database.');
		message.channel.send("Connecté à la base de données");
	});
	
	// Vérification de l'existence de la table des inscrits
	let sql_table = "CREATE TABLE IF NOT EXISTS inscrits_ligue (" +//
						"id_joueur			INTEGER		NOT NULL,"+//
						"pseudo_discord		TEXT		NOT NULL,"+//
						"pseudo_cockatrice	TEXT		NOT NULL,"+//
						"id_liste_MV		INTEGER		NOT NULL,"+//
						"hash_cockatrice	TEXT		NOT NULL,"+//
						"id_role_discord	INTEGER		NOT NULL" +//
					");";
	db.run(sql_table, err => {
		if (err) { return console.error(err.message); }
		console.log("Successful creation of the 'Books' table");
		message.channel.send("Commande de vérification de table inscrits_ligue OK");
	});
	
	// Fermeture de la connexion
	db.close((err) => {
		if (err) { return console.error(err.message); }
		console.log('Close the database connection.');
		message.channel.send("Connexion à la base de données fermée");
	});
}
