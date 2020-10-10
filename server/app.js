const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', '../public')
let root = path.join(__dirname, '../')
let staticDir = path.join(root, 'statics');
console.log(staticDir)
app.use('/statics', express.static(staticDir))

app.get('/', (req, res)=>{
	res.render('index')
})
console.log("http://localhost:8080");

app.listen(8080, (err)=>{
	if(err) console.log(err);
	console.log("Server listening on Port: ", 8080);
});