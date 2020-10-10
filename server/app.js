const express = require('express')
const path = require('path')
const sqlite = require('sqlite3')

const app = express()

app.set('view engine', 'ejs')
app.set('views', '../public')

let root = path.join(__dirname, '../')
let staticDir = path.join(root, 'statics');
app.use('/statics', express.static(staticDir))

let db = new sqlite.Database(path.join(root, 'database/')+'database.db', (err)=>{
	if(err) throw err.message;
	console.log("Connected to the database!")
})
let table = "users";
db.all(`select * from ${table}`, [], (err, rows)=>{
	if(err) throw err;
	rows.forEach((row)=>{
		console.log(row.email)
	})
})

db.close((err)=>{
	if(err) throw err;
	console.log("Server closed!")
});

app.get('/', (req, res)=>{
	res.render('index')
})
console.log("http://localhost:8080");

app.listen(8080, (err)=>{
	if(err) console.log(err);
});