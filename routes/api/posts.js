const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


// GET /api/users/check-token
router.post('/create',ensureLoggedIn,  postsCtrl.createNewPost);
router.put('/like/:postId',ensureLoggedIn,  postsCtrl.addLike);
router.get('/myposts',ensureLoggedIn,  postsCtrl.getMyPosts);
router.get('/posts/:userId?',ensureLoggedIn, postsCtrl.getAllPosts);
router.get('/allposts/post/:id',ensureLoggedIn, postsCtrl.getFullPost);
router.post('/post/:id', ensureLoggedIn,  postsCtrl.addComment);
router.put('/myposts/:id', ensureLoggedIn,  postsCtrl.addLock);
router.delete('/myposts/:id', ensureLoggedIn,  postsCtrl.deletePost);
// router.get('/userposts/:id', ensureLoggedIn,  postsCtrl.getUserPosts);
router.get('/favorites', ensureLoggedIn,  postsCtrl.getUserFavoritePosts);
router.delete('/post/:commentId',ensureLoggedIn,  postsCtrl.deleteComment);

module.exports = router;