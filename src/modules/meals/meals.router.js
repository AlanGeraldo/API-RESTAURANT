import express from 'express';
import {
  createMeals,
  deleteMeal,
  findAllMeals,
  findOneMeal,
  updateMeal,
} from './meals.controller.js';
import { validExistRestaurant } from '../restaurant/restaurant.middleware.js';
import { validExistMeal } from './meals.middleware.js';
import { protect, protectAccountOwner, restricTo } from '../users/users.meddleware.js';

export const router = express.Router();

router.post('/:id',restricTo('admin') ,validExistRestaurant,createMeals);

router.get('/', findAllMeals);

router.use(protect)
router
.route('/:id')
.get(validExistMeal ,findOneMeal)
.patch(restricTo('admin') ,validExistMeal,protectAccountOwner ,updateMeal)
.delete(restricTo('admin') ,validExistMeal,protectAccountOwner ,deleteMeal);
