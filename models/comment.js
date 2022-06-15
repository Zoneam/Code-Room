const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1500,
      },
      author: {type: Schema.Types.ObjectId, ref: 'User'},
      dateCreated: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
});

module.exports = mongoose.model('Comment', commentSchema);