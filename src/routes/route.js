import express from 'express'
import { router as userRouter } from '../modules/users/users.router.js'
import { router as restaurantRouter } from '../modules/restaurant/restaurant.route.js';
import { router as mealsRouter } from '../modules/meals/meals.router.js';
import { router as ordersRouter } from '../modules/orders/orders.route.js';
import { protect } from '../modules/users/users.meddleware.js';

 export const router = express.Router();

router.use('/users', userRouter)
router.use(protect)
router.use('/restaurants', restaurantRouter)
router.use('/meals', mealsRouter)
router.use('/orders', ordersRouter)
