const Post = require("../../models/post");
const User = require("../../models/user");

module.exports = {
  getAllPosts,
  getMyPosts,
  getFullPost,
  getUserFavoritePosts,
  
  addLike,
  addLock,
  addComment,
  createNewPost,
  
  deletePost,
  deleteComment,
};

// Get All Public Posts (Paginated)
async function getAllPosts(req, res) {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5; 
  try {
    let query = { public: true };
    if (userId) {
      query.author = userId;
    }
    const count = await Post.countDocuments(query);
    const totalPages = Math.ceil(count / pageSize);
    if (page > totalPages) {
      return res.status(400).json({ error: 'Page does not exist' });
    }

    const posts = await Post.find(query)
      .populate("author")
      .sort({ dateCreated: -1 })
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
    res.status(201).json(post); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get all my posts
async function getMyPosts(req, res) {
  try {
    const posts = await Post.find({ author: req.user._id });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Add Like od Dislike
async function addLike(req, res) {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    let post = await Post.findById(postId).populate('author');
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.likes.includes(userId) 
    ? post.likes = post.likes.filter(like => like !== userId)  // If liked unlike
    : post.likes.push(userId);  // If not liked then like
  
    post = await post.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
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
      return res.status(404).json({ error: "Post not found" });
    } 
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
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
      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.findById(postId).populate("author");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
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
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete Comment
async function deleteComment(req, res) {
  try {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const post = await Post.findOne({ 'comments._id': commentId, 'comments.author': userId }).populate("author");
    if (!post) {
      return res.status(401).json({ error: 'You are not authorized to delete this comment' });
    }
    post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
    await post.save();
    post.comments = post.comments.reverse();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Lock Unlock post
async function addLock(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    let post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.public = !post.public;
    await post.save();
    const posts = await Post.find({ author: userId });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete Post
async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await Post.findOneAndDelete({ _id: postId, author: userId });
    
    if (!post) {
      return res.status(401).json({ error: 'You are not authorized to delete this post' });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get all user favorite posts
async function getUserFavoritePosts(req, res) {
  try {
    const userId = req.user._id;

    const posts = await Post.find({ 'likes': userId })
      .populate("author");

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: 'No favorite posts found for this user' });
    }

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
