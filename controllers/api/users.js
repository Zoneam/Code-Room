const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const Post = require('../../models/post');

module.exports = {
  create,
  login,
  checkToken,
  getUserInfo,
};

// login User
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json( createJWT(user) );
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

// Create User
async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can use res.json to send back just a string
    // The client code take this into consideration
    res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code 
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  res.json(req.exp);
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

async function getUserInfo(req, res) {
  try {
    // const user = await User.findById(req.user._id);
    const posts = await Post.find({ author: req.user._id });
    const allPosts = await Post.find({});
    const totalPosts = posts.length;
    let totalLikes = 0;
    let totalComments = 0;

    allPosts.forEach(post => {
      // Check if the current user's id exists in the likes array of the post
      if (post.likes.includes(req.user._id)) {
        totalLikes += 1;
      }

      // Count comments made by the user
      post.comments.forEach(comment => {
        if (comment.author.toString() === req.user._id.toString()) {
          totalComments += 1;
        }
      });
    });

    res.json({
      totalPosts: totalPosts,
      totalComments: totalComments,
      totalLikes: totalLikes,
    });  } catch (err) {
    res.status(400).json(err);
  }
}