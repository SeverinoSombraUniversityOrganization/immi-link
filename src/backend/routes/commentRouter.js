const BaseCrudRouter = require('./baseCrudRouter');
const commentController = require('../controllers/commentController');

class CommentRouter extends BaseCrudRouter {
}

module.exports = new CommentRouter(commentController).getRouter();