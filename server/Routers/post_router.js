let router = require('express').Router()
let auth = require('./auth')

router.get('/photo_post', auth.requireAuth, (req, res)=>{
	res.render('photo_post')
})
router.post('photo_post', auth.requireAuth, (req, res)=>{

	/*Get the post data
	* 1. Title
	* 2. Photo URL
	* 3. Content
	* 4. Upload it to database.
	* 5. Redirect to Views.
	* */

	res.render('photo_post_view')
})

router.get('/blog_post', auth.requireAuth, (req, res)=>{
	res.render('blog_post')
})

router.post('/blog_post', auth.requireAuth, (req, res)=>{
	/*Get the post data
	* 1. Title
	* 2. Photo URL if any
	* 3. Content
	* 4. Upload it to database.
	* 5. Redirect to Views.
	* */
	res.render('blog_post_view')
})

module.exports = router