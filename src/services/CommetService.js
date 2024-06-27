const BaseEntityService = require('./BaseEntityService');

class CommentService extends BaseEntityService {
    constructor() {
        super('comment'); 
    }
}

module.exports = new CommentService();