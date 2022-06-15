const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  author: {type: Schema.Types.ObjectId, ref: 'User',},
  comments: { type: Schema.Types.ObjectId, ref: 'Comment'},
  likes: {
    type: Schema.Types.ObjectId, ref: 'Like'
  },
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