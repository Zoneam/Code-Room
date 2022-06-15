const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


// GET /api/users/check-token
router.get('/allposts', ensureLoggedIn, postsCtrl.getAllPublicPosts);
router.post('/create',  postsCtrl.createNewPost);

module.exports = router;