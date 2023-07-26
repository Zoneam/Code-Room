const Post = require("../../models/post");
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
  getUserFavoritePosts,
  deleteComment,
};

// Get All Public Posts
// Get All Public Posts (Paginated)
async function getAllPosts(req, res) {
  const page = parseInt(req.query.page) || 1; // default to page 1
  const pageSize = 5; // number of posts per page
  try {
    const count = await Post.countDocuments({ public: true });
    const totalPages = Math.ceil(count / pageSize);
    const posts = await Post.find({ public: true })
    .populate("author")
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    console.log("PAGE -----> ",posts)
    res.json({ posts, totalPages });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

// Create new post
async function createNewPost(req, res) {
  req.body.post.author = req.user._id;
  console.log("REQ.BODY.POST -----> ",req.body.post)
  const post = Post.create(req.body.post)
  console.log("POST ----->+++ ",post)
  res.json(post);
}

// Get all my posts
async function getMyPosts(req, res) {
  console.log("REQ.USER -----> ",req.user._id)
  const posts = await Post.find({ author: req.user._id });
  console.log("POSTS -----> ",posts)
  res.json(posts);
}

// Add Like
async function addLike(req, res) {
  const post = await Post.findById(req.params.postId )
  .populate("author")
  console.log("POST -----> ", post)
    if(!post.likes.includes(req.user._id)){
      post.likes.push(req.user._id);
    } else {
      post.likes.splice(post.likes.indexOf(req.user._id),1)
    }
    await post.save();
    console.log("POST -----> ",post)
    res.json(post);
  }

// Get full post page
async function getFullPost(req, res) {
  const post = await Post.findById(req.params.id)
  .populate("author")
     post.comments = post.comments.reverse(); 
     res.json(post);
}

// Add Comment
async function addComment(req, res) {
  let comment = {
    commentText:req.body.comment,
    author: req.user._id,
  }
  User.findOne({ _id: req.user._id}, async function(err,foundUser) {
      comment.username = foundUser.name
      Post.findOne({ _id: req.params.id })
      .populate("author")
      .exec( async function (err, foundPost) {
        foundPost.comments.push(comment)
        await foundPost.save();
        foundPost.comments = foundPost.comments.reverse();
        res.json(foundPost);
      })
    })
}

// Delete Comment
async function deleteComment(req, res) {
  const post = await Post.findOne({ 'comments._id': req.params.commentId , 'comments.author': req.user._id })
  .populate("author")
  if (post) {
    // Find the comment with the specified commentId and remove it from the comments array
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === req.params.commentId
    );
    if (commentIndex >= 0) {
      post.comments.splice(commentIndex, 1);
      await post.save();
      post.comments = post.comments.reverse();
      res.json(post);
    } else {
      // If the comment does not exist, return an error message
      res.status(404).json({ error: 'Comment not found' });
    }
  } else {
    // If the post does not exist or is not owned by the user, return an error message
    res.status(401).json({ error: 'You are not authorized to delete this post' });
  }
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
  const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
  if (post) {
    await Post.deleteOne({ _id: req.params.id });
    const posts = await Post.find({ author: req.user._id });
    res.json(posts);
  } else {
    // If the post does not exist or is not owned by the user, return an error message
    res.status(401).json({ error: 'You are not authorized to delete this post' });
  }
}


// Get all user posts
async function getUserPosts(req, res) {
   Post.find({$and:[{ public: true }, {author: req.params.id}]})
  .populate("author")
  .populate("likes")
  .exec(function (err, posts) {
    res.json(posts); 
  });
}

// Get all user favorite posts
async function getUserFavoritePosts(req, res) {
  const posts = await Post.find({ 'likes': req.user._id })
  .populate("author")
  console.log("POSTS -----> ",posts)
  res.json(posts); 
}
