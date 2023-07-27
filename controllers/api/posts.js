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

    if (page > totalPages) {
      return res.status(400).json({ error: 'Page does not exist' });
    }

    const posts = await Post.find({ public: true })
      .populate("author")
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.json({ posts, totalPages });
  } catch (err) {
    console.error(err.message);

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}


// Create new post
async function createNewPost(req, res) {
  try {
    req.body.post.author = req.user._id;
    const post = await Post.create(req.body.post);
    res.status(201).json(post); // 201 Created
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get all my posts
async function getMyPosts(req, res) {
  try {
    const posts = await Post.find({ author: req.user._id });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}


// Add Like
async function addLike(req, res) {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    
    let post = await Post.findById(postId).populate("author");
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // check if the user has already liked the post
    if (!post.likes.includes(userId)) {
      post = await Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true }).populate("author");
    } else {
      post = await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true }).populate("author");
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}


// Get full post page
async function getFullPost(req, res) {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
  .populate({
    path: 'comments',
    options: { sort: { 'date': -1 } }
  })
  .populate('author');
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } 
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}


// Add Comment
async function addComment(req, res) {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    const commentText = req.body.comment;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = await Post.findById(postId).populate("author");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
      commentText,
      author: userId,
      username: user.name,
    };

    post.comments.push(comment);
    await post.save();
    post.comments = post.comments.reverse();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}


// Delete Comment
async function deleteComment(req, res) {
  try {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const post = await Post.findOne({ 'comments._id': commentId, 'comments.author': userId }).populate("author");
    if (!post) {
      return res.status(401).json({ message: 'You are not authorized to delete this comment' });
    }
    post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
    await post.save();
    post.comments = post.comments.reverse();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// Add Lock
async function addLock(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    let post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.public = !post.public;
    await post.save();
    const posts = await Post.find({ author: userId });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// Delete Post
async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await Post.findOneAndDelete({ _id: postId, author: userId });
    
    if (!post) {
      return res.status(401).json({ message: 'You are not authorized to delete this post' });
    }
    const posts = await Post.find({ author: userId });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}



// Get all user posts
async function getUserPosts(req, res) {
  try {
    const userId = req.params.id;
    const posts = await Post.find({ public: true, author: userId })
      .populate("author")
      .populate("likes");

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// Get all user favorite posts
async function getUserFavoritePosts(req, res) {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ 'likes': userId })
      .populate("author");

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
