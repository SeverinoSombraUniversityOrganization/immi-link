const BaseCrudRepository = require('./baseCrudRepository');
const PostModel = require('../models/postModel');

class PostRepository extends BaseCrudRepository {      
}

module.exports = new PostRepository(PostModel);