import express from 'express'
import { deleteUser, login, register, updateUser } from './users.controller.js';
import { validExistUser } from './users.meddleware.js';

export const router = express.Router();

router.post('/login', login)
router.post('/register', register)

router
    .route('/:id')
    .patch(validExistUser ,updateUser)
    .delete(validExistUser ,deleteUser)
