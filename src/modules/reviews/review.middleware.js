import { AppError, catchAsync } from '../../errors/index.js';
import { ReviewService } from './review.services.js';

const reviewService = new ReviewService();

export const validExistReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await reviewService.findOneReview(id);

  if (!review) {
    return next(new AppError(`Review with id: ${id} not found`, 404));
  }

  req.user = review.user
  req.review = review;

  next();
});
