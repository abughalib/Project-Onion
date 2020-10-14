const express = require('express')
const session = require('express-session')
const path = require('path')
const home_router = require('./Routers/home_router')
const users_router = require('./Routers/user_router')
const post_router = require('./Routers/post_router')

const app = express()

app.set('view engine', 'ejs')
app.set('views', '../public')
app.use(express.urlencoded({extended: false}))

app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: "hja&*%&^9jh_lgi*adi3&m3^&o9k23hii**(hi43jkl4()*()&)&%$#%$^&*()__+(&%#@!@!~"
}))

app.use((req, res, next)=>{
	let err = req.session.error;
	let msg = req.session.success;
	delete req.session.error;
	delete req.session.success;
	res.locals.message = '';
	if(err) res.locals.message = "<p class='msg error'>"+err+"</p>";
	if(msg) res.locals.message = '<p class="msg success">'+msg+'</p>';
	next();
})

let root = path.join(__dirname, '../')
let staticDir = path.join(root, 'statics');
app.use('/statics', express.static(staticDir))


app.use('/users', users_router)
app.use('/post', post_router)
app.use('', home_router)

app.listen(8080, (err)=>{
	if(err) console.log(err);
	console.log("http://localhost:8080");
});