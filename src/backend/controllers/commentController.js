const BaseCrudController = require('./baseCrudController');
const CommentRepository = require('../repositories/commentRepository')

class CommentController extends BaseCrudController {    
}

module.exports = new CommentController(CommentRepository);