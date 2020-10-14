const router = require('express').Router();
const auth = require('./auth')

router.get('/login', auth.notAuth, (req, res)=>{
	res.render('login')
});
router.post('/login', auth.notAuth, (req, res)=>{
	auth.authenticate(req.body.username, req.body.password, (err, user)=>{
		if(user){
			req["session"].regenerate(()=>{
				// Required to fix this thing below
				// We should not store everything in session.
				req["session"].user = user;
				req["session"].success = "Authenticated as "+user.name;

				//later using database and shadow user.
				res.redirect(`/users/profile`)
			})
		}else{
			req["session"].error = "Authentication Failed, Check credential";
			console.log("Authentication Failed, Check credential")
			res.redirect('/users/login')
		}
	})
})
router.get('/register', auth.notAuth, (req, res)=>{
	res.render('register')
})
router.post('/register', auth.notAuth, (req, res)=>{
	auth.registration(req, res, (error)=>{
		console.log(error);
		res.render('register', {error: "Check fields"})
	})
})

router.get('/profile', auth.requireAuth, (req, res)=>{
	res.render('profile', {user: req["session"].user})
});


module.exports = router