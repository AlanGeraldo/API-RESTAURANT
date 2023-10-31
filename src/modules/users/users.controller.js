import { extracValidationData } from '../../common/utils/extracValidateData.js';
import { verifyPassword } from '../../config/plugins/encriptedPassword.js';
import generateJWT from '../../config/plugins/generate-jwt.js';
import { AppError, catchAsync } from '../../errors/index.js';
import { updateUserValidation, validateLogin, validateRegister } from './users.schema.js';
import { UserService } from './users.services.js';

const userService = new UserService();

export const login = catchAsync(async (req, res, next) => {
  const { errorMessages, hasError, userData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const user = await userService.findUserByEmail(userData.email);

  if (!user) {
    return next(new AppError(`This accound does not exist`, 404));
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

export const register = catchAsync(async (req, res, next) => {
  const { errorMessages, hasError, userData } = validateRegister(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const user = await userService.createUser(userData);

  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const {
    userData,
    errorMessages,
    hasError,
  } = updateUserValidation(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const userUpdated = await userService.updateUser(user ,userData)

  return res.status(200).json(userUpdated)
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await userService.deleteUser(user)
  return res.status(204).json(null)
});
