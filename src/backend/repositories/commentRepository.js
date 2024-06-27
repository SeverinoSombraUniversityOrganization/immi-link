const BaseCrudRepository = require('./baseCrudRepository');
const CommentModel = require('../models/commentModel');

class CommentRepository extends BaseCrudRepository {      
}

module.exports = new CommentRepository(CommentModel);