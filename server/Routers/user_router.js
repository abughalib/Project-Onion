const express = require('express');

let router = express.Router();

router.get('/login', (req, res)=>{
	console.log("Login Page should be here!");
});
router.get('/register', (req, res)=>{
	console.log("Registration Page should be here!");
})
router.get('/profile', (req, res)=>{
	console.log("Profile Page should be here!");
});

module.exports = router