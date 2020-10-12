const hash = require('pbkdf2-password')()
const sqlite = require('sqlite3')

function registration(username, password){
	let db = sqlite.Database('../database/database.db', sqlite.OPEN_READWRITE , (err)=>{
		if(err) throw err;
		console.log("Connected to database for reading & writing!");
	})
	hash({password: password}, (err, pass, salt, hash)=>{
		if(err) throw err;
		// Dummy database for now.

		db.all(`INSERT INTO users(name, email, phone, role, password, salt, insta_id, pic) 
values('${name}', '${email}', '${phone}', '${role}', '${password}', '${salt}', '${insta_id}', '${pic}')`, [], (err, rows)=>{

			if(err) throw err;
			console.log("Registered!")
			})
	});
}

function authenticate(username, password, fun){

	let db = sqlite.Database('../database/database.db', sqlite.OPEN_READ , (err)=>{
		if(err) throw err;
		console.log("Connected to database for reading!");
	})

	if(!module.parent) console.log("Authenticating as %s:%s", username, password);
	//Dummy database for now
	let users = {};
	db.all(`SELECT * from users WHERE email='${username}'`, (err, rows)=>{
		if(err) throw err;
		users = rows[0];
	})
	let user = users[username];
	if(!user) return fun(new Error('User not found!'));

	hash({password: password, salt: user.salt}, (err, pass, salt, hash)=>{
		if(err) throw err;
		if(hash === user.hash) return fun(null, user)
		fun (new Error("Invalid password"))
	})
}

function requireAuth(req, res, next){
	if(req.session.user){
		next()
	}else{
		req.session.error = "Access denied";
		res.redirect('/users/login')
	}
}
function notAuth(req, res, next){
	if(req.session.user){
		req.session.error = "Registered Already";
		res.redirect('/users/profile')
	}else{
		next()
	}
}

exports.registration = registration
exports.authenticate = authenticate
exports.requireAuth = requireAuth
exports.notAuth = notAuth