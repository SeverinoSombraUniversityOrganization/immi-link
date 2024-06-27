const mongoose = require('../services/databaseService');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
