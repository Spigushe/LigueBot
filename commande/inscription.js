exports.run = (client, message, Discord, prefix) => {
	message.reply("On amorce le processus d'inscription.");
	
	var sqlite3 = require('sqlite3');
	var db = new sqlite3.Database('sqlite02.db');
	
	db.serialize(function() {
	    db.run("create table if not exists log (date)");
	    db.all("select date from log", function(err, rows) {
	        if( rows.length == 0 )
	        {
	            message.channel.send("Première exécution !");
	        }
	        else
	        {
	            for( var i in rows )
	            {
	                console.log(rows[i].date);
	            }
	        }
	    });
	
	    var date = new Date().toLocaleString();
	    var stmt = db.prepare("insert into log values (?)");
	    stmt.run(date);
	});
}
