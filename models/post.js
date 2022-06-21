const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var moment = require('moment');

const commentSchema = new Schema({
  commentText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 400,
    },
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    username: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
      get: (timestamp) => moment(timestamp).format('YYYY-MM-DD'),
    },
});

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 70
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