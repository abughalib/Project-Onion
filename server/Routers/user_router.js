const router = require('express').Router();
const auth = require('./auth')

router.get('/login', auth.notAuth, (req, res)=>{
	res.render('login')
});
router.post('/login', auth.notAuth, (req, res)=>{
	console.log(`${req.body.username}\n${req.body.password}`)
	auth.authenticate(req.body.username, req.body.password, (err, user)=>{
		if(user){
			req.session.regenerate(()=>{
				req.session.user = user;
				req.session.success = "Authenticated as "+user.name;

				//later using database and shadow user.
				res.redirect(200, `/users/profile`)
			})
		}else{
			req.session.error = "Authentication Failed, Check credential";
			console.log("Authentication Failed, Check credential")
			res.redirect(400, '/users/login')
		}
	})
})
router.get('/register', auth.notAuth, (req, res)=>{
	res.render('register')
})
router.post('/register', auth.notAuth, (req, res)=>{
	auth.registration(req, res)
})

router.get('/profile', auth.requireAuth, (req, res)=>{
	res.render('profile')
});


module.exports = router