const Post = require("../../models/post");
const Like = require("../../models/like");
const User = require("../../models/user");

module.exports = {
  getAllPosts,
  getMyPosts,
  createNewPost,
  addLike,
  getFullPost,
  addComment,
  addLock,
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
  res.json(posts);
}

// Add Like
async function addLike(req, res) {
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

    res.json(posts);
  });
})
}

async function getFullPost(req, res) {
  const post = await Post.find({ _id: req.params.id });
  res.json(post);
}

// Add Comment
async function addComment(req, res) {
  let comment = {
    commentText:req.body.comment,
    author: req.user._id,
  }
  User.findOne({ id: req.params.id}, async function(err,foundUser) {
    console.log(foundUser,req.params.id);
    comment.username = foundUser.name
    Post.findOne({ _id: req.params.id }, async function(err,found){
      found.comments.push(comment)
      await found.save();
      res.json(found);
    })

  })
}


// Add Lock
async function addLock(req, res) {
    Post.findOne({ _id: req.params.id }, async function(err,found){
      found.public = !found.public
      console.log("LOCKIIIING",found)
      await found.save();
      const posts = await Post.find({ author: req.user._id });
      res.json(posts);
    })

}
