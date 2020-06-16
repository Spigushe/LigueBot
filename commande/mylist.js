exports.run = (client, message, Discord, prefix) => {
	// Appel du package axios
	const axios = require("axios").default;

	// Création de la chaine de données pour GET
	let informations =  "&id=" + message.author.id;

	// Récupération des infos
	axios.get("http://ligue.spigushe.com/index.php?page=Inscription&action=Retrieve"+informations)
	.then( function (response) {
		// La connexion à la page a réussi
		if (response.data.match(/erreur/gi)) {
			message.author.send("Ta demande a rencontré un problème, nous t'invitons à réessayer");
		} else {
            var msg = "Voici votre liste enregistrée / You can find your current list here \n"+response.data;
            message.author.send(msg);
		}
	}).catch( function (error) {
		// La connexion à la page a échoué
		message.author.send("Error whilst executing the command :\n-------------\nErreur lors de l'exécution de la commande : \n" + error );
	});
};
