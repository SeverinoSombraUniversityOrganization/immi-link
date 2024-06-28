const BaseEntityService = require('./BaseEntityService');

class PostService extends BaseEntityService {
    constructor() {
        super('post'); 
    }

    async updateLikes(id, data, userToken = null) {
        try {
            const likes = data.likes || [];
            const userIndex = likes.indexOf(id);
            if (userIndex === -1) {
                likes.push(id);
            } else {
                likes.splice(userIndex, 1);
            }

            const updatedLikesData = { likes };
            const response = await this.update(id, updatedLikesData, userToken);
            return response;
        } catch (error) {
            throw error;
        }
    }
    


}

module.exports = new PostService();