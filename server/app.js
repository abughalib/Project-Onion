const express = require('express')
const fs = require('fs')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'public')
app.use('/statics', express.static('statics'))

app.get('/', (req, res)=>{
	res.render('index')
})
console.log("http://localhost:8080");

app.listen(8080, (err)=>{
	if(err) console.log(err);
	console.log("Server listening on Port: ", 8080);
});