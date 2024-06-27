const BaseEntityService = require('./BaseEntityService');

class PostService extends BaseEntityService {
    constructor() {
        super('post'); 
    }
}

module.exports = new PostService();