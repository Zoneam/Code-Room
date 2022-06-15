const Post = require('../../models/post');


module.exports = {
    getAllPublicPosts,
    createNewPost,
};

async function getAllPublicPosts(req, res) {
    const posts = await Post.find({});
    res.json(posts);
  }

async function createNewPost(req, res) {
    console.log("HIT-----------", req.body)
    req.body.author = req.user._id
    
    const post = new Post(req.body)

    await post.save();
    res.json(post);
  }
