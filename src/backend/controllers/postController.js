const BaseCrudController = require('./baseCrudController');
const postRepository = require('../repositories/postRepository')

class PostController extends BaseCrudController {    
}

module.exports = new PostController(postRepository);