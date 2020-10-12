const hash = require('pbkdf2-password')()

function registration(username, password){
	hash({password: password}, (err, pass, salt, hash)=>{
		if(err) throw err;
		// Dummy database for now.
		let users = {
			user: {name: 'name'}
		};
		users.user.salt = salt;
		users.user.hash = hash;
	});
}

function authenticate(username, password, fun){
	if(!module.parent) console.log("Authenticating as %s:%s", username, password);
	//Dummy database for now
	let users = {
		user: {name: 'name'}
	};

	let user = users[username];
	if(!user) return fun(new Error('User not found!'));

	hash({password: password, salt: user.salt}, (err, password, salt, hash)=>{
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