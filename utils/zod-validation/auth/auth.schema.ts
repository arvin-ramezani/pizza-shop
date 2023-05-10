import * as yup from 'yup';
import { z } from 'zod';

// export const signupSchema = z.object({
//   firstName: z.string().min(1),
//   lastName: z.string(),
//   email: z.string().email(),
//   phone: z.string(),
//   password: z.string().min(4),
//   address: z.string(),
// });

export const signupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().optional(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  password: yup.string().min(4).max(20).required(),
  placeList: yup.string().required(),
});

export const signinSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});
