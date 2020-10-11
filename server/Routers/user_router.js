const router = require('express').Router();
const auth = require('./auth')

router.get('/login', (req, res)=>{
	res.render('login')
});
router.post('/login', (req, res)=>{
	let login_info = {
		username: req.username,
		password: req.password
	}
	console.log(login_info)
	auth.authenticate(req.body.username, req.body.password, (err, user)=>{
		if(user){

			req.session.regenerate(()=>{
				req.session.user = user;
				req.session.success = "Authenticated as "+user.name;
				//later using database and shadow user.
				res.redirect(200, `/user/profile/:${user}`)
			})
		}else{
			req.session.error = "Authentication Failed, Check credential";
			res.redirect('/users/login')
		}
	})
})
router.get('/register', (req, res)=>{
	res.render('register')
})

function requireAuth(req, res, next){
	if(req.session.user){
		next()
	}else{
		req.session.error = "Access denied";
		res.redirect('/login')
	}
}

router.get('/profile', requireAuth, (req, res)=>{
	res.render('profile')
});

module.exports = router