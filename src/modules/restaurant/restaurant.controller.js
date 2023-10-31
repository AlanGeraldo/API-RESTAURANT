import { catchAsync } from '../../errors/index.js';
import { validatePartialReview, validateReview } from '../reviews/review.schema.js';
import {
  validatePartialRestaurant,
  validateRestaurant,
} from './restaurant.schema.js';
import { RestaurantService } from './restaurant.services.js';
import { ReviewService } from '../reviews/review.services.js';

const restaurantService = new RestaurantService();
const reviewService = new ReviewService();

export const findAllRestaurats = catchAsync(async (req, res, next) => {
  const restaurant = await restaurantService.findAllRestaurants();

  return res.status(200).json(restaurant);
});

export const createRestaurant = catchAsync(async (req, res, next) => {
  const { errorMessages, hasError, restaurantData } = validateRestaurant(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const restaurant = await restaurantService.createRestaurant(restaurantData);

  return res.status(201).json(restaurant);
});

export const findOneRestaurat = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  return res.status(200).json(restaurant);
});

export const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  const { errorMessages, hasError, restaurantData } = validatePartialRestaurant(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const restaurantUpdate = await restaurantService.updateRestaurant(
    restaurant,
    restaurantData
  );

  return res.status(200).json(restaurantUpdate);
});

export const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurantService.deleteRestaurant(restaurant);

  return res.status(204).json(null);
});

export const createReviewToRestaurant = catchAsync(async (req, res, next) => {
  const { errorMessages, hasError, reviewData } = validateReview(req.body);
  const { restaurant } = req;
  const { sessionUser } = req;

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const review = await reviewService.create(reviewData,{
    restaurantId: restaurant,
    userId: sessionUser.id,
  });

  return res.status(201).json(review);
});

export const updateReview = catchAsync(async (req, res, next) => {
  const { errorMessages, hasError, reviewData } = validatePartialReview(req.body)
  const { review } = req;

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    })
  }

  const reviewUpdated = await reviewService.updatedReview(review, reviewData)

  return res.status(200).json(reviewUpdated)
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await reviewService.deleteReview(review)

  return res.status(204).json(null)
});
