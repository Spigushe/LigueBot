exports.run = (client, message, Discord, prefix) => {
	message.reply("On amorce le processus d'inscription.");
	
	// Connexion à la base de données
	const mysql = require('mysql').Client;
	const client = new Client(); 
	
	// Données de connexion à la base de données
	client.host = 'mtgnantes.fr.mysql';
	client.user = 'mtgnantes_frdiscord_ligue';
	client.password = 'LigueDuelCommander';
	
	// Connexion à la base de données
	client.connect(function(err, results) {
	    if (err) {
	        console.log("ERROR: " + err.message);
	        throw err;
	    }
	    console.log("connected.");
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
	client.query(sql_table, function (err) {
		if (err) { message.channel.send(err); }
		console.log('Création OK');
	});
	
}
