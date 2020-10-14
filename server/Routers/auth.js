const hash = require('pbkdf2-password')()
const sqlite = require('sqlite3')

function registration(req, res){
	let db = new sqlite.Database('../database/database.db', sqlite.OPEN_READWRITE , (err)=>{
		if(err) throw err;
		console.log("Connected to database for reading & writing!");
	})
	hash({password: req.body.password1}, (err, pass, salt, hash)=>{
		if(err) throw err;

		db.all(`INSERT INTO users(name, email, phone, role, password, salt, insta_id) 
values('${req.body.name}', '${req.body.email}', '${req.body.phone}', '${req.body.role}', '${hash}', '${salt}', '${req.body.insta_id}')`, [], (err, rows)=>{

			if(err) throw err;
			console.log("Registered!")
			})
	});
	res.redirect('/users/profile')
}

function authenticate(username, password, fun){

	let db = new sqlite.Database('../database/database.db', (err)=>{
		if(err) throw err;
		console.log("Connected to database for reading!");
	})
	db.all(`SELECT * from users WHERE email='${username}'`, (err, rows)=>{
		if(err) return fun(new Error("User not found!"))
		hash({password: password, salt: rows[0].salt}, (err, pass, salt, hash)=>{
			if(err) throw err;
			if(hash === rows[0].password) return fun(null, rows[0])
			fun(new Error("Invalid password!"))
		})
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
		req.session.error = "Logged in Already";
		res.redirect('/users/profile')
	}else{
		next()
	}
}

exports.registration = registration
exports.authenticate = authenticate
exports.requireAuth = requireAuth
exports.notAuth = notAuth