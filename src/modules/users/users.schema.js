import z from 'zod';
import { extracValidationData } from '../../common/utils/extracValidateData.js';

const registerUserSchema = z.object({
  name: z.string().min(3, { message: 'Name is too short' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password is too short' }),
});

const loginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password is too short' }),
});

const updateUserSchema = z.object({
  name: z.string().min(3, { message: 'Name is too short' }),
  email: z.string().email({ message: 'Invalid email' }),
});

export const validateRegister = (data) => {
  const result = registerUserSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extracValidationData(result);

  return {
    errorMessages,
    hasError,
    userData,
  };
};

export const validateLogin = (data) => {
  const result = loginUserSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extracValidationData(result);

  return {
    errorMessages,
    hasError,
    userData,
  };
};

export const updateUserValidation = (data) => {
  const result = updateUserSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extracValidationData(result);

  return {
    errorMessages,
    hasError,
    userData,
  };
};
