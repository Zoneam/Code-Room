const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
    },
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    dateCreated: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
});



const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 35
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    default: 'js'
  },
  description: {
    type: String,
    required: false,
  },
  public: {
    type: Boolean,
    default: false,
    required: true,
  },
  author: {type: Schema.Types.ObjectId, ref: 'User',},
  comments: [commentSchema],
  likes: { type: Schema.Types.ObjectId, ref: 'Like' },
  category: {
    type: String,
    enum: ['Coding', 'DataScience', 'UIUX', 'None'],
    default: 'None',
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
});



module.exports = mongoose.model('Post', postSchema);