const hash = require('pbkdf2-password')()
const session = require('express-session')

app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: "hja&*%&^9jh_lgi*adi3&m3^&o9k23hii**(hi43jkl4()*()&)&%$#%$^&*()__+(&%#@!@!~"
}))

app.use((req, res, next)=>{
	let err = req.session.error;
	let msg = req.session.success;
	delete req.session.error;
	delete req.session.success;
	res.locals.message = '';
	if(err) res.locals.message = "<p class='msg error'>"+err+"</p>";
	if(msg) res.locals.message = '<p class="msg success">'+msg+'</p>';
	next();
})

export function registration(username, password){
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

export function authenticate(username, password, fun){
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