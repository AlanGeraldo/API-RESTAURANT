import User from '../users/users.model.js';
import Review from './review.model.js';

export class ReviewService {
  async findOneReview(id) {
    return await Review.findOne({
      where: {
        id,
        status: 'active',
      },
      include: [
        {
          model: User,
        },
      ],
    });
  }

  async create(data) {
    return await Review.create(data);
  }

  async updatedReview (review, data) {
    return await review.update(data)
  }

  async deleteReview (review) {
    return await review.update({status: 'deleted'})
  }
}
