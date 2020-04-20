exports.run = (client, message, Discord, prefix) => {
	message.reply("On amorce le processus d'inscription.");
	
	// Connexion à la base de données
	const mysql = require('mysql');
	message.channel.send('Package appelé');
	
	// Données de connexion à la base de données
	var sql = mysql.createConnection({
        'host':"mtgnantes.fr.mysql",
        'port':'3306',
        'user':"mtgnantes_frdiscord_ligue",
        'password':"LigueDuelCommander",
        'database':"mtgnantes_frdiscord_ligue"
	});
	message.channel.send('Données de connexion saisies');
	
	// Connexion à la base de données
	message.channel('Amorce connexion');
	sql.connect(function(err) {
	    if (err) {
	        message.channel.send("ERROR: " + err.message);
	        throw err;
	    }
	    console.log("connected.");
	    message.channel.send("Connecté à " + client.host);
	});
	
	message.channel.send('Suite de la commande');
	/*
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
	//*/
}
