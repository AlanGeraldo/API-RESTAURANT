import express from 'express';
import {
  findAllRestaurats,
  createRestaurant,
  findOneRestaurat,
  updateRestaurant,
  deleteRestaurant,
  createReviewToRestaurant,
  updateReview,
  deleteReview,
} from './restaurant.controller.js';
import {
  validExistRestaurant,
  validateExistRestaurant,
} from './restaurant.middleware.js';
import { validExistReview } from '../reviews/review.middleware.js';
import { protect, protectAccountOwner, restricTo } from '../users/users.meddleware.js';

export const router = express.Router();

router.route('/').get(findAllRestaurats).post(createRestaurant);

router
  .route('/:id')
  .get(validateExistRestaurant, findOneRestaurat)
  .patch(validateExistRestaurant, updateRestaurant)
  .delete(validateExistRestaurant, deleteRestaurant);

  router.use(protect)

router.post('/reviews/:id', restricTo('admin') ,validExistRestaurant, createReviewToRestaurant);

router
  .route('/reviews/:restaurentId/:id')
  .patch(
    restricTo('admin'),
    validExistRestaurant,
    validExistReview,
    protectAccountOwner,
    updateReview
  )
  .delete(
    restricTo('admin'),
    validExistRestaurant,
    validExistReview,
    protectAccountOwner,
    deleteReview
  );
