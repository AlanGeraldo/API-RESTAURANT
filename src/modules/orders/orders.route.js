import express from 'express';
import {
  createOrder,
  deleteOrder,
  findAllOrders,
  updateOrder,
} from './orders.controller.js';
import { protect, protectAccountOwner } from '../users/users.meddleware.js';
import { validateExistOrderId } from './orders.middleware.js';



export const router = express.Router();

router.use(protect)

router.post('/',createOrder);
router.get('/me', findAllOrders);

router.route('/:id')
    .patch(validateExistOrderId,updateOrder)
    .delete(validateExistOrderId,deleteOrder)
