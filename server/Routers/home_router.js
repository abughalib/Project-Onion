const express = require('express')

let router = express.Router()

router.get('', (req, res)=>{
	res.render('index')
})
router.all('*', (req, res)=>{
	res.render('404')
})

module.exports = router