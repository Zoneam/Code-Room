const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  post:  {
    type: String,
    },
  likes: {
    type: Number,
    default: 0,
    },
  users: Array,
}, {
  timestamps: true
});

likeSchema.virtual('likesCount')
  .get(function() {
    return this.users.length;
  });

module.exports = mongoose.model('Like', likeSchema);