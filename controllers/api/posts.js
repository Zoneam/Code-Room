const Post = require("../../models/post");
const Like = require("../../models/like");

module.exports = {
  getAllPosts,
  getMyPosts,
  createNewPost,
  addLike,
  getFullPost,
};

// Get All Public Posts
async function getAllPosts(req, res) {
  Post.find({ public: true })
  .populate("author")
  .populate("likes")
  .exec(function (err, posts) {
    res.json(posts);
  });
}

// Create new post
async function createNewPost(req, res) {
  req.body.post.author = req.user._id;
  const newLike = new Like();
  req.body.post.likes = newLike;
  const post = new Post(req.body.post);
  newLike.post = post.id;
  await post.save();
  await newLike.save();
  res.json(post);
}

// Get all my posts
async function getMyPosts(req, res) {
  const posts = await Post.find({ author: req.user._id });
  console.log(posts)
  res.json(posts);
}

// Add Like
async function addLike(req, res) {
  console.log(req.params.postId)
  Like.findOne({ post: req.params.postId }, async function(err,found){
    if(!found.users.includes(req.user._id)){
        found.users.push(req.user._id);
       await found.save();
    } else {
        found.users.splice(found.users.indexOf(req.user._id),1)
       await found.save();
    }
    Post.find({ public: true })
  .populate("likes")
  .populate("author")
  .exec(function (err, posts) {
    console.log(posts)
    res.json(posts);
  });
})
}


async function getFullPost(req, res) {
  const post = await Post.find({ _id: req.params.id });
  res.json(post);
}

