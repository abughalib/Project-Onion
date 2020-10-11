const express = require('express');
const auth = require('./auth')

let router = express.Router();

router.get('/login', (req, res)=>{
	res.render('login')
});
router.post('/login', (req, res)=>{
	let login_info = {
		username: req.username,
		password: req.password
	}
	console.log(login_info)
	res.redirect(200, '/user/profile/:id')
})
router.get('/register', (req, res)=>{
	res.render('register')
})
/*router.get('/profile', (req, res)=>{
	res.render('profile',)
});*/

module.exports = router