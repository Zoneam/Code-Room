const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


// GET /api/users/check-token
router.post('/create',ensureLoggedIn,  postsCtrl.createNewPost);
router.put('/like/:postId',ensureLoggedIn,  postsCtrl.addLike);
router.get('/myposts',ensureLoggedIn,  postsCtrl.getMyPosts);
router.get('/allposts', postsCtrl.getAllPosts);
router.get('/allposts/post/:id', postsCtrl.getFullPost);
router.post('/post/:id', ensureLoggedIn,  postsCtrl.addComment);
module.exports = router;