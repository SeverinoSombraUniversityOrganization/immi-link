const mongoose = require('../services/databaseService');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
