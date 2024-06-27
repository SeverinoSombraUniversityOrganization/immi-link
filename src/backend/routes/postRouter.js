const BaseCrudRouter = require('./baseCrudRouter');
const postController = require('../controllers/postController');

class PostRouter extends BaseCrudRouter {
}

module.exports = new PostRouter(postController).getRouter();