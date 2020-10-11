const express = require('express')
const path = require('path')
const home_router = require('./Routers/home_router')
const users_router = require('./Routers/user_router')

const app = express()

app.set('view engine', 'ejs')
app.set('views', '../public')

let root = path.join(__dirname, '../')
let staticDir = path.join(root, 'statics');
app.use('/statics', express.static(staticDir))


app.use('/users', users_router)
app.use('', home_router)

console.log("http://localhost:8080");
app.listen(8080, (err)=>{
	if(err) console.log(err);
});