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
  getUserFavoritePosts,
  addUserFavoriteLike,
  deleteComment,
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
  Post.find({$and:[{ public: true }, {author: req.params.userId}]})
  .populate("likes")
  .populate("author")
  .exec(function (err, post) {
    res.json(post);
  });
})
}

//Add User Like  to favorite posts
async function addUserFavoriteLike(req, res) {
  Like.findOne({ post: req.params.postId }, async function(err,found){
    if(!found.users.includes(req.user._id)){
        found.users.push(req.user._id);
       await found.save();
    } else {
        found.users.splice(found.users.indexOf(req.user._id),1)
       await found.save();
    }
  Post.find({})
  .populate("likes")
  .populate("author")
  .exec(function (err, posts) {
    let favoritePosts = posts.filter((post)=>{
      return post.likes.users.includes(req.user._id)
    })
    res.json(favoritePosts); 
  });
})
}

// Get full post page
async function getFullPost(req, res) {
  Post.findOne({ _id: req.params.id })
  .populate("author")
  .exec(function (err, post) {
     post.comments = post.comments.reverse(); 
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
  const post = await Post.findOne({ 'comments._id': req.params.commentId , 'comments.author': req.user._id });
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
  Post.find({})
  .populate("likes")
  .populate("author")
  .exec(function (err, posts) {
    let favoritePosts = posts.filter((post)=>{
      return post.likes.users.includes(req.user._id)
    })
    res.json(favoritePosts); 
  });
}
