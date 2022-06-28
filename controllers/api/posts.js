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
  deletePost,
  getUserPosts,
  addUserLike,
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

//Add User Like 
async function addUserLike(req, res) {
  Like.findOne({ post: req.params.postId }, async function(err,found){
    if(!found.users.includes(req.user._id)){
        found.users.push(req.user._id);
       await found.save();
    } else {
        found.users.splice(found.users.indexOf(req.user._id),1)
       await found.save();
    }
    Post.find({author: req.params.userId})
  .populate("likes")
  .populate("author")
  .exec(function (err, posts) {
    res.json(posts);
  });
})
}

// Get full post page
async function getFullPost(req, res) {
  const post = await Post.find({ _id: req.params.id })
  .populate("author")
  .exec(function (err, post) {
    console.log(post);
     post[0].comments = post[0].comments.reverse(); 
     res.json(post);
  })
 
 
}

// Add Comment
async function addComment(req, res) {
  let comment = {
    commentText:req.body.comment,
    author: req.user._id,
  }
  User.findOne({ _id: req.user._id}, async function(err,foundUser) {
    comment.username = foundUser.name
    Post.findOne({ _id: req.params.id }, async function(err,found){
      found.comments.push(comment)
      await found.save();
      found.comments = found.comments.reverse();
      res.json(found);
    })

  })
}

// Add Lock
async function addLock(req, res) {
    Post.findOne({_id: req.params.id }, async function(err,found){
      found.public = !found.public
      await found.save();
      const posts = await Post.find({ author: req.user._id });
      res.json(posts);
    })

}

// Delete Post
async function deletePost(req, res) {
  Post.deleteOne({_id: req.params.id }, async function(err){
    const posts = await Post.find({ author: req.user._id });
    res.json(posts);
  })
}

// Get all user posts
async function getUserPosts(req, res) {
  await Post.find({$and:[{ public: true }, {author: req.params.id}]})
  .populate("author")
  .populate("likes")
  .exec(function (err, posts) {
    res.json(posts); 
  });
}

